import express from "express"
import CalculateAvarages from "./calculate-avarages"
import Avarages from "./avarages"

const app = express()

app.get("/", (req, res) => {
  res.redirect("/avarages")
})

app.get("/avarages", async (req, res) => {
  if(!req.query.id) {
    return res.status(400).json({
      message: "Please insert a valid id."
    })
  }

  const id: string = String(req.query.id)
  
  const allAvarages = await Avarages(id)
  console.log(Avarages(id), id)
  res.status(200).json({
    notas: allAvarages
  })
})
app.post("/calculate-avarages", async (req,res) => {
  if(!req.query.id) {
    return res.status(400).json({
      message: "Please insert a valid id."
    })
  }

  try {
    const id: string = String(req.query.id)
    
    CalculateAvarages(id)
  } catch(error) {
    return res.status(400).json(error)
  } finally {
    res.json({
      message: "Todas as notas foram calculadas e escritas na planilha."
    })
  }


})
app.listen(3000, () => {
  console.log("The server is running on port 3000")
})
