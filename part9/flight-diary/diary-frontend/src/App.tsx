import { useState, useEffect } from "react";
import { NewDiaryEntry, DiaryEntry, WeatherType, VisibilityType } from "./types";
import { createDiary, getDiaries } from "./services/diaries";


const App = () => {
  const [diaries, setDiaries ] = useState<DiaryEntry[]>([]);
  const [values, setValues] = useState<NewDiaryEntry>({
    date: "",
    visibility: VisibilityType.Ok,
    weather: WeatherType.Sunny ,
    comment:""
  })
  const [error, setError] = useState('');

  useEffect(() => {
    getDiaries().then(data => { 
      setDiaries(data)
    })
  }, []);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
    setValues({...values,[event.target.name] : event.target.value})
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try {
      const res = await createDiary(values)
      console.log(res)
      diaries.concat(res)
    } catch (error: any) {
      console.log(error.message)
      setError(error.message)
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>date:
          <input
            type="date" 
            name="date"
            onChange={handleChange}
          />
        </label><br/>
        <label>visibility:
          <input
            type="radio" 
            name="visibility"
            value={VisibilityType.Great}
            onChange={handleChange}
          />Great
          <input
            type="radio" 
            name="visibility"
            value={VisibilityType.Good}
            onChange={handleChange}
          />Good
          <input
            type="radio" 
            name="visibility"
            value={VisibilityType.Ok}
            onChange={handleChange}
          />Ok
          <input
            type="radio" 
            name="visibility"
            value={VisibilityType.Poor}
            onChange={handleChange}
          />Poor
        </label><br/>
        <label>Weather:
          <input
            type="radio" 
            name="weather"
            value={WeatherType.Sunny}
            onChange={handleChange}
          /> Sunny
          <input
            type="radio" 
            name="weather"
            value={WeatherType.Rainy}
            onChange={handleChange}
          />Rainy
          <input
            type="radio" 
            name="weather"
            value={WeatherType.Cloudy}
            onChange={handleChange}
          />Cloudy
          <input
            type="radio" 
            name="weather"
            value={WeatherType.Windy}
            onChange={handleChange}
          />Windy
        </label><br/>
        <label>Comment:
          <input
            type="text" 
            name="comment"
            onChange={handleChange}
          />
        </label><br/>
        <input type="submit" />
      </form>
      <h1>Diary Entries</h1>
      {diaries.map(diary => 
        <div key={diary.id}>
          <h3 >{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;