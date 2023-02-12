console.log("안녕하세요")

function getToken(number) {
    const result = String(Math.floor(Math.random() * 10**number)).padStart(number, "0")
    console.log(result);
}

getToken(4);
