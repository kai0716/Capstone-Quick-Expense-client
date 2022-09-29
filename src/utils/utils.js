
function ReceiptAmount(data) {
    if (data) {
        let total = -1;
        let amount = -2;
        data.toLowerCase().split(/\r?\n/).forEach(element => {
            if (element.match(new RegExp("\\b" + "total" + "\\b"))) {
                total = parseFloat(element.replace(/[^0-9.]/g, ''));

            }
            if (element.match(new RegExp("\\b" + "amount" + "\\b"))) {
                amount = parseFloat(element.replace(/[^0-9.]/g, ''));
            }
        })

        if (total === amount && typeof (total) === "number" && !isNaN(total)) {
            return total
        }
        if (total !== -1 && typeof (total) === "number" && !isNaN(total)) {
            return total
        }
        else if (amount !== -2 && typeof (amount) === "number" && !isNaN(total)) {
            return amount
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}

function ReceiptGST(data) {
    if (data) {
        let gst = -1;
        data.toLowerCase().split(/\r?\n/).forEach(element => {
            if (element.match(new RegExp("\\b" + "gst" + "\\b"))) {
                gst = parseFloat(element.replace(/[^0-9.]/g, ''));

            }
        })

        if (gst !== -1 && typeof (gst) === "number" && !isNaN(gst)) {
            console.log("gst:", gst)
            return gst
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}

function ReceiptPST(data) {
    if (data) {
        let pst = -1;
        data.toLowerCase().split(/\r?\n/).forEach(element => {
            if (element.match(new RegExp("\\b" + "pst" + "\\b"))) {
                pst = parseFloat(element.replace(/[^0-9.]/g, ''));

            }
        })

        if (pst !== -1 && typeof (pst) === "number" && !isNaN(pst)) {
            console.log("pst:", pst)
            return pst
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}

function ReceiptDate(data) {
    let date = "none";
    let charDate = undefined;
    if (data) {
        data.toLowerCase().split(/\r?\n/).forEach(element => {
            if (element.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)) {
                element.split(" ").forEach(word => {
                    if (word.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)) {
                        date = word;
                        console.log(date, "QQ");
                    }
                })
            }

            else {
                let months = {
                    jan: '01',
                    feb: '02',
                    mar: '03',
                    apr: '04',
                    may: '05',
                    jun: '06',
                    jul: '07',
                    aug: '08',
                    sep: '09',
                    oct: '10',
                    nov: '11',
                    dec: '12',
                }
                element.split(" ").forEach(word => {
                    if (word.includes("jan") || word.includes("feb") || word.includes("mar") || word.includes("apr") || word.includes("may") || word.includes("jun") || word.includes("jul") || word.includes("aug") || word.includes("sep") || word.includes("oct") || word.includes("nov") || word.includes("dec")) {
                        let year = 0;
                        let month = 0;
                        let day = 0;
                        const li = word.split('-');
                        for (let i = 0; i < li.length; i++) {
                            if (parseInt(i) > 1000) {
                                year = parseInt(li[i]);
                                month = parseInt(months[li[i + 1]]) - 1;
                                day = parseInt(li[i + 2]);
                                charDate = new Date(year, month, day)
                                break;
                            }
                            if (parseInt(i) <= 31) {
                                day = parseInt(li[i]);
                                month = parseInt(months[li[i + 1]]) - 1;
                                year = parseInt(li[i + 2]);
                                charDate = new Date(year, month, day)
                                break;
                            }
                        }
                    }
                })
            }
        })

        if (date !== "none") {
            if (date.includes('/') && date.match(/\d{2}([\/])\d{2}\1\d{4}/g)) {
                console.log(date, "/////")
                let year = 0;
                let month = 0;
                let day = 0;
                const li = date.split('/');
                for (let i = 0; i < li.length; i++) {
                    if (parseInt(li[i]) > 1000) {
                        year = parseInt(li[i]);
                        month = parseInt(li[i + 1]) - 1;
                        day = parseInt(li[i + 2].substring(0, 2));
                        return new Date(year, month, day);
                    }
                    if (parseInt(li[i]) < 12) {
                        month = parseInt(li[i]) - 1;
                        day = parseInt(li[i + 1]);
                        year = parseInt(li[i + 2].substring(0, 4));
                        return new Date(year, month, day);
                    }
                    else if (parseInt(li[i]) <= 31) {
                        day = parseInt(li[i]);
                        month = parseInt(li[i + 1]) - 1;
                        year = parseInt(li[i + 2].substring(0, 4));
                        return new Date(year, month, day);
                    }
                    else {
                        return new Date();
                    }
                }
                return new Date();
            }
            if (date.includes('-') && date.match(/\d{2}([\-])\d{2}\1\d{4}/g)) {
                let year = 0;
                let month = 0;
                let day = 0;
                const li = date.split('-');
                console.log(date, "TEST");
                for (let i = 0; i < li.length; i++) {
                    if (parseInt(li[i]) > 1000) {
                        year = parseInt(li[i]);
                        month = parseInt(li[i + 1]) - 1;
                        day = parseInt(li[i + 2].substring(0, 2));
                        return new Date(year, month, day);
                    }
                    if (parseInt(li[i]) < 12) {
                        month = parseInt(li[i]) - 1;
                        day = parseInt(li[i + 1]);
                        year = parseInt(li[i + 2].substring(0, 4));
                        return new Date(year, month, day);
                    }
                    else if (parseInt(li[i]) <= 31) {
                        day = parseInt(li[i]);
                        month = parseInt(li[i + 1]) - 1;
                        year = parseInt(li[i + 2].substring(0, 4));
                        return new Date(year, month, day);
                    }
                    else {
                        return new Date();
                    }
                }
                return new Date();
            }
            if (date.includes('.') && date.match(/\d{2}([\.])\d{2}\1\d{4}/g)) {
                console.log(".....")
                let year = 0;
                let month = 0;
                let day = 0;
                const li = date.split('.');
                console.log(li[0])
                for (let i = 0; i < li.length; i++) {
                    if (parseInt(li[i]) > 1000) {
                        year = parseInt(li[i]);
                        month = parseInt(li[i + 1]) - 1;
                        day = parseInt(li[i + 2].substring(0, 2));
                        return new Date(year, month, day);
                    }
                    if (parseInt(li[i]) < 12) {
                        month = parseInt(li[i]) - 1;
                        day = parseInt(li[i + 1]);
                        year = parseInt(li[i + 2].substring(0, 4));
                        return new Date(year, month, day);
                    }
                    else if (parseInt(li[i]) <= 31) {
                        day = parseInt(li[i]);
                        month = parseInt(li[i + 1]) - 1;
                        year = parseInt(li[i + 2].substring(0, 4));
                        console.log(li[i + 2].substring(0, 4), "INSIDE")
                        return new Date(year, month, day);
                    }
                    else {
                        return new Date();
                    }
                }
                return new Date();
            }
        }
        else {
            if (charDate !== undefined) {
                return charDate
            }
            return new Date();
        }
    }
    else {
        return new Date();
    }

}
module.exports = {
    ReceiptGST,
    ReceiptPST,
    ReceiptAmount,
    ReceiptDate
}

