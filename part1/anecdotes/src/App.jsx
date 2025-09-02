import { use, useState } from "react"

const Display = ({ title, quote, vote }) => {
  if (title) {
    return (
      <h1>{title}</h1>
    )
  }
  if ([quote, vote]) {
    return (
      <div>
        <div>{quote}</div>
        <div>has {vote} votes</div>
      </div>
    )
  }
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })
  const [largestQuote, setLargestQuote] = useState("")
  const [largestVote, setLargestVote] = useState(0)

  const randomQuote = () => {
    const length = anecdotes.length - 1
    const randNum = Math.round(Math.random() * length)
    setSelected(randNum)
  }
  const voteQuotes = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVote(copy)
  }
  const getGreatestVote = () =>{
    let maxVote = -Infinity
    let maxKey = null
    for(let key in votes){
      if(votes[key] > maxVote){
        maxVote = votes[key]
        maxKey = key
      }
    }
    setLargestQuote(anecdotes[maxKey])
    setLargestVote(maxVote)
  }
  const handleClick = () => {
    randomQuote()
    getGreatestVote()
  }
  return (
    <div>
      <Display title="Anecdote of the day" />
      <Display quote={anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={() => {voteQuotes(); getGreatestVote(); }} text={"vote"} />
      <Button onClick={handleClick} text={"next anecdote"} />
      <Display title="Anecdote with the most votes" />
      <Display quote={largestQuote} vote={largestVote} />
    </div>
  )
}
export default App