
function calculateAverage(scores) {
    let sum = 0;

    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }

    return sum / scores.length;
}

function classify(avg) {
    if (avg >= 8) {
        return "Giỏi";
    } else if (avg >= 6.5) {
        return "Khá";
    } else if (avg >= 5) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}

function getScoreClass(score) {
    if (score >= 8) {
        return "green";
    } else if (score >= 0 && score <= 4) {
        return "red";
    }
    return "";
}

document.getElementById("calculate").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const error = document.getElementById("error");

    const subjects = [
        "Giải tích 1",
        "Đại số tuyến tính",
        "Xác suất thống kê",
        "Tin học đại cương",
        "Xây dựng ứng dụng Web"
    ];

    const scores = [];
    error.textContent = "";

    if (name === "") {
        error.textContent = "Vui lòng nhập họ và tên sinh viên!";
        return;
    }

    for (let i = 1; i <= 5; i++) {
        const input = document.getElementById("score" + i);
        const value = input.value.trim();
        const score = Number(value);

        if (value === "" || !Number.isFinite(score)
            || score < 0 || score > 10) {
            error.textContent =
                "Vui lòng nhập đầy đủ điểm từ 0 đến 10 cho 5 môn!";
            input.focus();
            return;
        }

        scores.push(score);
    }

    const avg = calculateAverage(scores);
    const ranking = classify(avg);

    document.getElementById("studentResult").textContent = name;

    const table = document.getElementById("resultTable");
    table.innerHTML = "";

    for (let i = 0; i < scores.length; i++) {
        const row = document.createElement("tr");

        const stt = document.createElement("td");
        stt.textContent = i + 1;

        const subject = document.createElement("td");
        subject.textContent = subjects[i];

        const scoreCell = document.createElement("td");
        scoreCell.textContent = scores[i].toFixed(2);
        scoreCell.className = getScoreClass(scores[i]);

        row.appendChild(stt);
        row.appendChild(subject);
        row.appendChild(scoreCell);
        table.appendChild(row);
    }

    const averageElement = document.getElementById("average");
    averageElement.textContent = avg.toFixed(2);
    averageElement.className = getScoreClass(avg);

    document.getElementById("classification").textContent = ranking;
});
