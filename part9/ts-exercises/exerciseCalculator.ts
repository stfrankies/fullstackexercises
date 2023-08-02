interface CalcValues {
    target: number;
    hours: Array<number>; 
}

const parseArgument = (args: string[]): CalcValues => {
    if(args.length < 4)
        throw new Error('Not enough arguments')

    const hour: Array<number> = []

    for(let i = 3; i < args.length; i++){
        if(isNaN(Number(args[2])) && isNaN(Number(args[3]))){
            throw new Error('provided value were not numbers')
        }else{
            hour.push(Number(args[i])) 
        }
    }

    return {
        target: Number(args[2]),
        hours: hour
    }
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const calculateExercises = (hours: number[], target:number): Result => {
    
    let sumhours= 0
    const periodLength = hours.length
    const trainingDays = hours.filter(h => h !== 0).length;

    for(var h in hours){
        sumhours+=hours[h]
    }

    const average = sumhours/(hours.length)

    const success = average >= target

    const rates = (average : number, target: number): number => {
        const myRating = average/target
        if(myRating >= 1){
            return 3;
        }else if(myRating >= 0.8){
            return 2;
        }else{
            return 1;
        }
    }
    
    const rating = rates(average, target)
    
    const descriptions = (rating: number): string => {
        switch(rating){
            case 1:
                return "More time exercising would do you good"
            case 2:
                return "not too bad but could be better"
            default:
                return "excellent!"
        }
    }

    const ratingDescription = descriptions(rating)

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    } 
}

try{
    const { target, hours } = parseArgument(process.argv)
    console.log(calculateExercises(hours, target))
}catch(error: unknown){
    let errorMessage = 'Something bad happend.'
    if(error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
}