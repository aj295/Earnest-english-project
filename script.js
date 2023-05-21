import explanations from "./explanations.json" assert { type: 'json' }

let images = document.getElementsByClassName("picture")
let quotes = document.getElementsByClassName("quotes")
let movingImage = undefined
let currTextSelected = undefined
let explanation = undefined

for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("mousedown", (event) => {
        if (explanation == undefined) movingImage = event.target
    })
    images[i].addEventListener("mouseup", (event) => {
        movingImage = undefined
    })
}

for (let i = 0; i < quotes.length; i++) {
    quotes[i].addEventListener("mouseenter", (event) => {
        currTextSelected = event.target
        if (movingImage != undefined && String(movingImage.id).includes(currTextSelected.id)) {
            explanation = document.createElement("div")
            document.body.appendChild(explanation)
            explanation.style.position = "absolute"
            explanation.style.backgroundColor = "red"
            explanation.style.width = "50%"
            explanation.style.height = "50%"
            explanation.style.marginLeft = "25%"
            explanation.style.marginRight = "25%"
            explanation.style.marginTop = "10%"

            let text = document.createElement("p")
            explanation.appendChild(text)
            for (let value in explanations.explanations) {
                if (value = currTextSelected.id) {
                    text.innerHTML = explanations.explanations[value]
                    break
                }
            }

            text.style.fontSize = "25px"
            text.style.fontWeight = "bold"
            text.style.margin = "2%"
            text.style.fontFamily = "Monospace"

            currTextSelected.remove()
            movingImage.remove()
        }
    })
    quotes[i].addEventListener("mouseleave", (event) => {
        currTextSelected = undefined
    })
}

document.addEventListener("click", (event) => {
    if (explanation != undefined) {
        explanation.remove()
        explanation = undefined
    }
})

document.addEventListener("mousemove", (event) => {
    if (movingImage != undefined) {
        movingImage.style.left = event.pageX - movingImage.style.width + "px"
        movingImage.style.top = event.pageY - movingImage.style.height + "px"
    }
})