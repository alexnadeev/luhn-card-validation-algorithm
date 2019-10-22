let valid_num = '4485040993287616'
const inval_num = '4485040993287617'
const amex_num = '347650202246894'

inpt = document.getElementById("textInput");
sbmt = document.getElementById("btn")
outp = document.querySelector("#output")


class Card {
    
    constructor(num, type = "undefined"){
        this.type = type
        this.number = num        
        this.cards = {
            "VISA": {
                "start_dig": 4,
                "num_len": 16
                }, 
            "MASTERCARD": {
                "start_dig": [51, 52, 53, 54, 55],
                "num_len": 16
                },
            "AMERICAN EXPRESS": {
                "start_dig": [34, 37],
                "num_len": 15
                },
            "DISCOVER": {
                "start_dig": 601,
                "num_len": 16
                }
        }
        this.valid = this.cardValidation()
    }
        
    cardValidation(){
       let num_arr = Array.from(this.number).map((item, index) => {
           let tmp_item = index%2 === 0 ? parseInt(item*2): parseInt(item)
           return(tmp_item > 9? tmp_item - 9: tmp_item)
        })
        let arr_sum = 0;
        num_arr.map(item => arr_sum += item);
        let result = arr_sum%10 === 0? true: false;
        this.cardType();
        return result
    }
    
    viewCard(){
        return (this.valid ? `<b>Your card is a valid ${this.type} card </b>` : "<p>This is invalid card</p>")        
    }

    cardType = () => {
        Object.entries(this.cards).map(([key, value]) => {
            if (Array.isArray(value.start_dig)) {
                for (let i of value.start_dig) {
                    let re = new RegExp(`^${i}`)
                    re.test(this.number) && (this.type = key);
                }
            } else {
                    let re = new RegExp(`^${value.start_dig}`)
                    re.test(this.number) && (this.type = key);
            }
        })
    }
}

sbmt.addEventListener("click", () => {
    let test_card = new Card(inpt.value)
    outp.innerHTML = test_card.viewCard()
})

