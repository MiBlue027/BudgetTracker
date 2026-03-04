function ShowError(inputElement, message) {
    inputElement.style.border = "2px solid red";
    inputElement.focus();
    alert(message);
}

function ResetValidationStyle(...elements) {
    elements.forEach(el => {
        el.style.border = "1px solid #cbd5e1";
    });
}

function AppendItemToList(item, index) {

    const tableBody = document.querySelector(".itemTableBody");

    const row = document.createElement("tr");
    row.setAttribute("data-index", index);

    const nameTd = document.createElement("td");
    nameTd.textContent = item.name;

    const priceTd = document.createElement("td");
    priceTd.textContent = FormatCurrency(item.price);

    const quantityTd = document.createElement("td");
    quantityTd.textContent = item.quantity;

    const totalTd = document.createElement("td");
    totalTd.textContent = FormatCurrency(item.price * item.quantity);

    const actionTd = document.createElement("td");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        DeleteItem(index);
    });

    actionTd.appendChild(deleteBtn);

    row.appendChild(nameTd);
    row.appendChild(priceTd);
    row.appendChild(quantityTd);
    row.appendChild(totalTd);
    row.appendChild(actionTd);

    tableBody.appendChild(row);
}

function DeleteItem(index) {

    state.items.splice(index, 1);
    RenderTable();
    UpdateInvoice()
}

function RenderTable() {

    const tableBody = document.querySelector(".itemTableBody");
    tableBody.innerHTML = "";

    state.items.forEach((item, index) => {
        AppendItemToList(item, index);
    });
}

function FormatCurrency(value) {
    return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR"
    });
}


function OpenPrintPreview() {

    const preview = document.querySelector(".printPreview");
    const invoiceList = document.querySelector(".invoiceList");

    invoiceList.innerHTML = "";

    state.items.forEach(item => {

        const row = document.createElement("div");
        row.className = "printItemRow";

        const name = document.createElement("div");
        name.className = "printItemName";
        name.textContent = item.name;

        const detail = document.createElement("div");
        detail.className = "printItemDetail";
        detail.textContent =
            FormatCurrency(item.price) +
            " x " +
            item.quantity +
            " = " +
            FormatCurrency(item.price * item.quantity);

        row.appendChild(name);
        row.appendChild(detail);

        invoiceList.appendChild(row);
    });

    document.getElementById("invoiceBalance").textContent =
        document.getElementById("balanceInInvoice").textContent;

    document.getElementById("invoiceTotalBill").textContent =
        document.getElementById("totalBill").textContent;

    document.getElementById("invoiceRemainingBalance").textContent =
        document.getElementById("remainingBalance").textContent;

    // Set date
    document.querySelector(".printPreview .title p").textContent =
        new Date().toLocaleDateString("id-ID");

    preview.classList.add("active");
}
