// Khởi tạo danh sách các số từ 1 đến 170
let allNumbers = Array.from({ length: 170 }, (_, i) => i + 1);

// Xáo trộn danh sách số
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

allNumbers = shuffle(allNumbers); // Xáo trộn số

// Phân bổ số cho từng giải thưởng
let prizesNumbers = {
    4: allNumbers.slice(0, 50), // Giải tư: 50 số
    3: allNumbers.slice(50, 95), // Giải ba: 45 số
    2: allNumbers.slice(95, 115), // Giải nhì: 20 số
    1: allNumbers.slice(115, 125), // Giải nhất: 10 số
    special: allNumbers.slice(125, 126), // Giải đặc biệt: 1 số
};

// Trạng thái các giải thưởng
let prizes = {
    4: { id: "result-4th", max: 50, count: 0, perClick: 10 },
    3: { id: "result-3rd", max: 45, count: 0, perClick: 9 },
    2: { id: "result-2nd", max: 20, count: 0, perClick: 10 },
    1: { id: "result-1st", max: 10, count: 0, perClick: 2 },
    special: { id: "result-special", max: 1, count: 0, perClick: 1 },
};

// Trạng thái các nút
let isSpinning = false; // Đang quay hay không
let currentPrize = 4; // Bắt đầu từ giải tư
// Ẩn tất cả các thanh kết quả từ đầu
function hideAllResults() {
    Object.keys(prizes).forEach((prizeId) => {
        const resultDiv = document.getElementById(prizes[prizeId].id);
        resultDiv.style.display = "none";
        
    });
}
function showResultForPrize(prizeId) {
    hideAllResults(); // Ẩn tất cả các thanh kết quả khác

    const resultContainer = document.getElementById(
        `result-${prizeId === "special" ? "special" : `${prizeId}th`}-container`
    );
    const resultTitle = resultContainer.querySelector(".result-title"); // Lấy tiêu đề

    // Hiện thanh kết quả và tiêu đề với hiệu ứng
    resultContainer.style.display = "block";
    if (resultTitle) {
        resultTitle.style.display = "block"; // Hiện tiêu đề
    }

    setTimeout(() => {
        resultContainer.classList.add("visible");
    }, 10); // Độ trễ nhỏ để hiệu ứng mượt mà
}
// Hàm quay số với hiệu ứng
function spinWithEffect(prizeId) {
    if (isSpinning) return; // Nếu đang quay thì không cho bấm

    const prize = prizes[prizeId];
    const remainingNumbers = prizesNumbers[prizeId].slice(
        prize.count,
        prize.count + prize.perClick
    );

    if (remainingNumbers.length === 0) {
        if (prizeId === 4) {
            currentPrize = 3;
            document.getElementById("btn-3rd").style.display = "inline-block";
        } else if (prizeId === 3) {
            currentPrize = 2;
            document.getElementById("btn-2nd").style.display = "inline-block";
        } else if (prizeId === 2) {
            currentPrize = 1;
            document.getElementById("btn-1st").style.display = "inline-block";
        } else if (prizeId === 1) {
            currentPrize = "special";
            document.getElementById("btn-special").style.display = "inline-block";
        }
        return;

    }

    isSpinning = true; // Đặt trạng thái đang quay
    let spinResults = []; // Kết quả quay 10 số
    let intervalId;
    let spinCount = 0; // Số lần chạy hiệu ứng (10 lần)

    // Hàm hiển thị hiệu ứng quay số
    function showRandomNumbers() {
        const resultDiv = document.getElementById(prizes[prizeId].id);
        resultDiv.innerHTML = ""; // Xóa kết quả cũ

        spinResults = remainingNumbers.map(() =>
            Math.floor(Math.random() * 170) + 1 // Hiển thị số giả ngẫu nhiên
        );

        spinResults.forEach((number) => {
            const numberElement = document.createElement("span");
            numberElement.textContent = number;
            numberElement.classList.add("number-circle");
            resultDiv.appendChild(numberElement);
        });
          // Thêm tiêu đề giải
   
    }console.log("Danh sách số ban đầu:", allNumbers);
console.log("Danh sách số sau khi xáo trộn:", allNumbers);
console.log("Phân bổ số cho từng giải thưởng:", prizesNumbers);
console.log("Trạng thái các giải thưởng:", prizes);
console.log("Trạng thái các nút:", isSpinning, currentPrize);

// ...

function spinWithEffect(prizeId) {
    console.log(`Bắt đầu quay giải ${prizeId}`);
    // ...
}

function displayResult(prizeId, numbers) {
    console.log(`Kết quả giải ${prizeId}:`, numbers);
    // ...
}

// ...

document.getElementById("btn-4th").addEventListener("click", () => {
    console.log("Bấm nút Giải Tư");
    spinWithEffect(4);
});
document.getElementById("btn-3rd").addEventListener("click", () => {
    console.log("Bấm nút Giải Ba");
    spinWithEffect(3);
});
document.getElementById("btn-2nd").addEventListener("click", () => {
    console.log("Bấm nút Giải Nhì");
    spinWithEffect(2);
});
document.getElementById("btn-1st").addEventListener("click", () => {
    console.log("Bấm nút Giải Nhất");
    spinWithEffect(1);
});
document.getElementById("btn-special").addEventListener("click", () => {
    console.log("Bấm nút Giải Đặc Biệt");
    spinWithEffect("special");
});

    // Hiệu ứng quay 10 lần
    intervalId = setInterval(() => {
        showRandomNumbers();
        spinCount++;

        // Sau 10 lần chạy hiệu ứng
        if (spinCount === 10) {
            clearInterval(intervalId); // Dừng hiệu ứng

            // Lấy 10 số tiếp theo từ danh sách còn lại
            const finalNumbers = remainingNumbers.slice(0, prize.perClick);

            // Hiển thị kết quả cuối cùng
            displayResult(prizeId, finalNumbers);

            prize.count += finalNumbers.length; // Cập nhật số lượng đã quay
            isSpinning = false; // Đặt trạng thái không quay nữa
            console.log(`Số đã quay cho giải ${prizeId}:`, finalNumbers);

            // Ẩn kết quả của giải trước
            const previousPrizeId = getPreviousPrizeId(prizeId);
            if (previousPrizeId) {
                const previousResultDiv = document.getElementById(
                    prizes[previousPrizeId].id
                );
                previousResultDiv.style.display = "none"; // Ẩn thanh kết quả giải trước
            }
            // Nếu đã quay đủ số lượng cho giải hiện tại
            if (prize.count >= prize.max) {
                // Ẩn nút quay của giải hiện tại

                // Hiển thị nút quay tiếp theo
                if (prizeId === 4) {
                    currentPrize = 3;
                    document.getElementById("btn-4th").style.display = "none";
                    document.getElementById("btn-3rd").style.display = "inline-block";
                } else if (prizeId === 3) {
                    currentPrize = 2;
                    document.getElementById("btn-3rd").style.display = "none";
                    document.getElementById("btn-2nd").style.display = "inline-block";
                } else if (prizeId === 2) {
                    currentPrize = 1;
                    document.getElementById("btn-2nd").style.display = "none";
                    document.getElementById("btn-1st").style.display = "inline-block";
                } else if (prizeId === 1) {
                    currentPrize = "special";
                    document.getElementById("btn-1st").style.display = "none";
                    document.getElementById("btn-special").style.display = "inline-block";
                }
            }

        }
    }, 300); // Mỗi lần thay đổi số cách nhau 100ms
}
function getPrizeTitle(prizeId) {
    switch (prizeId) {
        case 4:
            return "Giải Tư";
        case 3:
            return "Giải Ba";
        case 2:
            return "Giải Nhì";
        case 1:
            return "Giải Nhất";
        case "special":
            return "Giải Đặc Biệt";
        default:
            return "";
    }
}
// Ẩn tất cả các thanh kết quả từ đầu
hideAllResults();
// Hàm lấy giải trước đó
function getPreviousPrizeId(prizeId) {
    const prizeOrder = [4, 3, 2, 1, "special"];
    const currentIndex = prizeOrder.indexOf(prizeId);
    return currentIndex > 0 ? prizeOrder[currentIndex - 1] : null;
}
// Hàm hiển thị kết quả
function displayResult(prizeId, numbers) {
    const resultDiv = document.getElementById(prizes[prizeId].id);
    resultDiv.innerHTML = ""; // Xóa kết quả cũ

    // Sắp xếp và hiển thị các số
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
    sortedNumbers.forEach((number) => {
        const numberElement = document.createElement("span");
        numberElement.textContent = number;
        numberElement.classList.add("number-circle");
        resultDiv.appendChild(numberElement);
    });

    resultDiv.style.display = "flex"; // Hiển thị kết quả dưới dạng thanh
}
// Hàm quay số và ẩn kết quả cũ
// function spinWheel(prizeId) {
//     if (isSpinning) return; // Nếu đang quay thì không cho bấm

//     const prize = prizes[prizeId];
//     const remainingNumbers = prizesNumbers[prizeId].slice(
//         prize.count,
//         prize.count + prize.perClick
//     );

//     if (remainingNumbers.length === 0) {
//         alert("Giải này đã quay xong!");
//         return;
//     }

//     isSpinning = true; // Đặt trạng thái đang quay
//     displayResult(prizeId, remainingNumbers); // Hiển thị số

//     prize.count += remainingNumbers.length;

//     // Kiểm tra nếu đã quay đủ số cho giải hiện tại
//     if (prize.count === prize.max) {
//         // Ẩn kết quả cũ của các giải trước
//         for (let id in prizes) {
//             if (prizeId !== id) {
//                 const resultDiv = document.getElementById(prizes[id].id);
//                 resultDiv.style.display = "none"; // Ẩn kết quả các giải khác
//             }
//         }

//         // Hiển thị tất cả các số của giải sau khi hoàn thành
//         displayResult(prizeId, prizesNumbers[prizeId]);

//         // Ẩn nút quay của giải hiện tại
//         document.getElementById(`btn-${prizeId === "special" ? "special" : `${prizeId}th`}`).style.display = "none";

//         // Hiển thị nút quay của giải tiếp theo
//         if (prizeId === 4) {
//             currentPrize = 3;
//             document.getElementById("btn-3rd").style.display = "inline-block"; // Hiển thị nút giải ba
//         } else if (prizeId === 3) {
//             currentPrize = 2;
//             document.getElementById("btn-2nd").style.display = "inline-block";
//         } else if (prizeId === 2) {
//             currentPrize = 1;
//             document.getElementById("btn-1st").style.display = "inline-block";
//         } else if (prizeId === 1) {
//             currentPrize = "special";
//             document.getElementById("btn-special").style.display = "inline-block";
//         }
//     }

//     // Bật lại nút sau khi hoàn thành
//     setTimeout(() => {
//         isSpinning = false;
//     });
// }

// Ẩn tất cả các nút trừ nút Giải Tư
document.getElementById("btn-4th").style.display = "inline-block";
document.getElementById("btn-3rd").style.display = "none";
document.getElementById("btn-2nd").style.display = "none";
document.getElementById("btn-1st").style.display = "none";
document.getElementById("btn-special").style.display = "none";

// Gắn sự kiện cho các nút
document.getElementById("btn-4th").addEventListener("click", () => spinWithEffect(4));
document.getElementById("btn-3rd").addEventListener("click", () => spinWithEffect(3));
document.getElementById("btn-2nd").addEventListener("click", () => spinWithEffect(2));
document.getElementById("btn-1st").addEventListener("click", () => spinWithEffect(1));
document.getElementById("btn-special").addEventListener("click", () => spinWithEffect("special"));
