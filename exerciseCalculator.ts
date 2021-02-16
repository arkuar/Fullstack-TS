type Rating = 1 | 2 | 3

type RatingDescription = "ok" | "not too bad but could be better"
  | "great!"

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number
}

function calculateRating(ratio: number): { rating: Rating, ratingDescription: RatingDescription } {
  let rating: Rating
  let ratingDescription: RatingDescription
  if (ratio < 0.4) {
    rating = 1
    ratingDescription = "ok"
  } else if (ratio < 0.9) {
    rating = 2
    ratingDescription = "not too bad but could be better"
  } else {
    rating = 3
    ratingDescription = "great!"
  }
  return {
    rating, ratingDescription
  }
}

function calculateExercises(hours: Array<number>, target: number): ExerciseResult {
  const trainingDays = hours.filter(d => d > 0).length
  const overTarget = hours.filter(d => d >= target).length
  const success = overTarget === hours.length
  const { rating, ratingDescription } = calculateRating(overTarget / trainingDays)
  
  return {
    periodLength: hours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average: hours.reduce((sum, val) => sum + val) / hours.length
  }
}

function parseExerciseArgs(args: Array<string>): { target: number, hours: Array<number> } {
  if (args.length < 2) throw new Error("Not enough arguments")
  if (args.some(v => isNaN(Number(v)))) throw new Error("Provided values were not numbers")

  return {
    target: Number(args[0]),
    hours: args.slice(1).map(v => Number(v))
  }
}

try {
  const { target, hours } = parseExerciseArgs(process.argv.slice(2))
  console.log(calculateExercises(hours, target))
} catch (e) {
  console.log(`Error encountered. Message: ${e.message}`)
}