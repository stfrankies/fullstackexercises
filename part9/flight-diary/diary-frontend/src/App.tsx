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
    const res = await createDiary(values)
    diaries.concat(res)
  }

  return (
    <div>
      <h1>Add new entry</h1>
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
            type="text" 
            name="visibility"
            onChange={handleChange}
          />
        </label><br/>
        <label>Weather:
          <input
            type="text" 
            name="weather"
            onChange={handleChange}
          />
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