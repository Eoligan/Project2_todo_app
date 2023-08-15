const errorMessage = (errorStr) => {
  if (errorStr === "add" || errorStr === "edit")
    alert("The task must be longer than 3 characters")
}

export default errorMessage
