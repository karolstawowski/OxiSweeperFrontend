import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { getDataSearch, postData } from '../api/api-client'
import { Cell } from '../components/Cell'
import { DifficultyLevelButton } from '../components/DifficultyLevelButton'
import { ApiEndpoint } from '../enums/api-endpoints'
import { ResponseMessage } from '../types/responseTypes'
import { difficultyLevels, DiffucultyLevelType } from '../utils/difficultyLevel'
import {
  CellType,
  countFlaggedCells,
  GameStatus,
  generateCells,
  generateMines,
  openCells,
  placeMarker,
} from '../utils/game'

export const Game = (): JSX.Element => {
  const [cookies] = useCookies<'userToken', { [k: string]: string }>([
    'userToken',
  ])
  const [gameDifficultyLevel, setGameDifficultyLevel] =
    useState<DiffucultyLevelType>(difficultyLevels[0])
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.GameWorks)
  const initialGameBoard = generateCells(
    gameDifficultyLevel.boardWidth,
    gameDifficultyLevel.boardHeight
  )

  const [cells, setCells] = useState<CellType[][]>(initialGameBoard)
  const [firstCell, setFirstCell] = useState<
    { x: number; y: number } | undefined
  >()
  const [gameDuration, setGameDuration] = useState<number>(0)
  const gameInterval = useRef<number>()
  const [bestScore, setBestScore] = useState<number>(-1)

  useEffect(() => {
    if (gameStatus === GameStatus.GameWon) {
      const newBestScore =
        bestScore > gameDuration || bestScore < 0 ? gameDuration : bestScore

      setBestScore(newBestScore)
      clearInterval(gameInterval.current)
      setNewScore(gameDuration, gameDifficultyLevel.level, cookies.userToken)
    } else if (gameStatus === GameStatus.GameOver) {
      clearInterval(gameInterval.current)
    }
  }, [gameStatus, bestScore, gameDuration])

  useEffect(() => {
    getDataSearch<{ score: number }>(
      ApiEndpoint.ScoreTop,
      [cookies.userToken, gameDifficultyLevel.level.toString()],
      cookies.userToken
    )
      .then((data) => setBestScore(data.score ?? -1))
      .catch((error: ResponseMessage) => {
        console.error(error.response.data.message)
      })
  }, [gameDifficultyLevel.level])

  const changeDifficultyLevel = (
    difficultyLevel: DiffucultyLevelType
  ): void => {
    setGameStatus(GameStatus.GameWorks)
    setGameDifficultyLevel(difficultyLevel)
    setFirstCell(undefined)
    setCells(
      generateCells(difficultyLevel.boardWidth, difficultyLevel.boardHeight)
    )

    clearInterval(gameInterval.current)
    setGameDuration(0)
  }

  const onCellLeftClick = (board: CellType[][], x: number, y: number): void => {
    let newCells

    if (firstCell === undefined) {
      setFirstCell({ x, y })
      newCells = generateMines(cells, gameDifficultyLevel, { x, y })
      setCells(newCells)

      gameInterval.current = window.setInterval(() => {
        setGameDuration((gameDuration) => gameDuration + 1)
      }, 1000)
    }

    if (gameStatus === GameStatus.GameWorks) {
      const [newBoard, newGameStatus] = openCells(
        newCells ?? board,
        x,
        y,
        gameDifficultyLevel
      )

      if (newGameStatus) {
        setGameStatus(newGameStatus)
      }

      setCells(newBoard.slice())
    }
  }

  const onCellRightClick = (x: number, y: number): void => {
    setCells((cells) => placeMarker(cells, x, y))
  }

  const onGameRestart = (): void => {
    clearInterval(gameInterval.current)
    setCells(initialGameBoard)
    setGameStatus(GameStatus.GameWorks)
    setFirstCell(undefined)
    setGameDuration(0)
  }

  const setNewScore = async (
    newScore: number,
    difficultyLevel: number,
    userToken: string
  ): Promise<void> => {
    await postData<ResponseMessage>(
      ApiEndpoint.Score,
      {
        score: newScore,
        difficulty_level: difficultyLevel,
        user_token: userToken,
      },
      userToken
    )
      .then((data) => console.log(data))
      .catch((error: ResponseMessage) =>
        console.error(error.response.data.message)
      )
  }

  return (
    <div className="flex flex-col flex-wrap items-center content-center justify-center h-full md:gap-4">
      <h1 className="md:text-lg">Minesweeper</h1>
      <div className="md:[&>*]:mx-2 lg:[&>*]:mx-4 xl:[&>*]:mx-8 flex flex-col md:flex-row gap-2">
        <div className="order-1 inline-block w-full mb-2 text-center md:order-none md:mb-0 md:w-auto">
          <h2 className="md:w-32">Time</h2>
          <h3>{gameDuration}</h3>
        </div>
        <div className="inline-block w-50 md:w-auto">
          <h2 className="text-2xl text-center md:text-4xl">
            {gameStatusInformation(gameStatus)}
          </h2>
          <h3
            className="px-3 py-1 mt-2 font-medium text-center rounded-md cursor-pointer md:mt-5 md:text-xl bg-slate-700 hover:bg-slate-400"
            onClick={onGameRestart}
          >
            Restart game
          </h3>
        </div>
        <div className="inline-block w-full text-center md:w-auto">
          <h2 className="md:w-32">Flags placed (mines)</h2>
          <h3>
            {countFlaggedCells(cells)} ({gameDifficultyLevel.minesNumber})
          </h3>
        </div>
      </div>

      <div className="flex justify-center select-none">
        <div
          style={{
            gridTemplateColumns: `repeat(${gameDifficultyLevel.boardWidth}, minmax(0, 1fr))`,
          }}
          className="grid gap-[2px] p-1 md:p-2 lg:p-3 md:gap-1 bg-slate-700"
          onContextMenu={(
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
          ): void => e.preventDefault()}
        >
          {cells.map((cellsRow, j) =>
            cellsRow.map((cell, i) => (
              <Cell
                key={j + i}
                onCellLeftClick={(): void => onCellLeftClick(cells, i, j)}
                onCellRightClick={(): void => onCellRightClick(i, j)}
                isGameWon={gameStatus === GameStatus.GameWon}
                isMine={cell.isMine}
                isOpen={cell.isOpen}
                isMarked={cell.isMarked}
                minesAround={cell.minesAround}
                x={i}
                y={j}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex gap-8 mt-3 md:text-xl">
        <div className="text-center">
          <h3>Best time</h3>
          <h4>{displayBestTime(bestScore)}</h4>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap">
            {difficultyLevels.map((diffLevel) => (
              <DifficultyLevelButton
                key={diffLevel.level}
                difficultyLevel={diffLevel.level}
                isSelected={diffLevel.level === gameDifficultyLevel.level}
                onSetDifficultyLevel={(): void =>
                  changeDifficultyLevel(diffLevel)
                }
              />
            ))}
          </div>
          <h3 className="mt-1 text-center md:text-lg">Difficulty Level</h3>
        </div>
      </div>
    </div>
  )
}

const gameStatusInformation = (gameStatus: GameStatus): string => {
  const gameInformation = {
    GameWorks: 'Play!',
    GameOver: 'Game Over!',
    GameWon: 'You won!',
  }

  return gameInformation[gameStatus]
}

const displayBestTime = (bestTime: number): string => {
  return bestTime > 0 ? bestTime.toString() : 'No record set'
}
