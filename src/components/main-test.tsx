

// The MVP is going to have a really ghetto way. Basically we will have a index which the user is on. 
// Words start out slightly trasparent. 
// When a user types some words for each char the user types we render and check char by char inputs. 
// If correct, show it as green or just filled in, incorrect, as red. 
// That way we can also get the incorrect and correct chars to count time. 
export default function MainTest ({ text }: { text: string }){
  const stringArray : string[] = text.split(' ');
  console.log(stringArray);

  return (
  <div>


  </div>
  )
} 