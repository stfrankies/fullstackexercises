
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
    const periodLength = hours.length

    const trainingDays = hours.filter(h => h !== 0).length;

    const average = (hours.reduce((a, b) => a + b, 0))/(hours.length);

    const success = average >= target

    const rates = (average : number, target: number): number => {
        const myRating = average/target
        if(myRating >= 1){
            return 3;
        }else if(myRating >= 0.9){
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))