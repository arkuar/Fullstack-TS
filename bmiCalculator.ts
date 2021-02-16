type Result = "Very severely underweight" | "Severely underweight"
  | "Underweight" | "Normal (healthy weight)"
  | "Overweight" | "Obese Class I (Moderately obese)"
  | "Obese Class II (Severely obese)" | "Obese Class III (Very severely obese)"

function calculateBmi(height: number, weight: number): Result {
  const bmi = weight / Math.pow(height / 100, 2)
  if (bmi < 15) {
    return "Very severely underweight"
  }
  if (bmi <= 17) {
    return "Severely underweight"
  }
  if (bmi <= 18.5) {
    return "Underweight"
  }
  if (bmi <= 25) {
    return "Normal (healthy weight)"
  }
  if (bmi <= 30) {
    return "Overweight"
  }
  if (bmi <= 35) {
    return "Obese Class I (Moderately obese)"
  }
  if (bmi <= 40) {
    return "Obese Class II (Severely obese)"
  }
  return "Obese Class III (Very severely obese)"
}

function parseBmiArgs(args: Array<string>): { height: number, weight: number } {
  if (args.length < 2) throw new Error("Not enough arguments")
  if (args.length > 2) throw new Error("Too many arguments")
  if (args.some(v => isNaN(Number(v)))) throw new Error("Provided values were not numbers")

  return {
    height: Number(args[0]),
    weight: Number(args[1])
  }
}

try {
  const { height, weight } = parseBmiArgs(process.argv.slice(2))
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log(`Error encountered. Message: ${e.message}`)
}
