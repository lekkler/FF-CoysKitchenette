// ----- LOGIN PAGE -----
function loginAdmin() {
  const input = document.getElementById("password").value;
  if (input === "admin123") {
    localStorage.setItem("admin_logged_in", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong password!");
  }
}

// ----- DASHBOARD PAGE -----
if (window.location.pathname.includes("dashboard.html")) {
  const isLoggedIn = localStorage.getItem("admin_logged_in");
  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
  }

  const orders = JSON.parse(localStorage.getItem("salesRecords")) || [];
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let salesToday = 0;
  let salesYesterday = 0;
  let salesMonth = 0;

  orders.forEach(order => {
    const date = new Date(order.timestamp);
    const dateStr = date.toDateString();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (dateStr === today) salesToday += order.amount;
    if (dateStr === yesterday) salesYesterday += order.amount;
    if (month === currentMonth && year === currentYear) salesMonth += order.amount;
  });

  document.getElementById("sales-today").textContent = `₱${salesToday.toFixed(2)}`;
  document.getElementById("sales-yesterday").textContent = `₱${salesYesterday.toFixed(2)}`;
  document.getElementById("sales-month").textContent = `₱${salesMonth.toFixed(2)}`;

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expensesList = document.getElementById("expenses-list");
  let totalExpense = 0;

  expenses.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = `${exp.date} - ${exp.item}: ₱${exp.amount}`;
    expensesList.appendChild(li);
    totalExpense += exp.amount;
  });

  document.getElementById("expenses-total").textContent = `₱${totalExpense.toFixed(2)}`;

  const stocks = JSON.parse(localStorage.getItem("menuStocks")) || [];
  const stockList = document.getElementById("stock-list");

  stocks.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name}: <span class="${item.stock <= 10 ? 'low-stock' : ''}">${item.stock}</span>`;
    stockList.appendChild(li);
  });
}

// ----- STOCK MANAGEMENT PAGE -----
const menuData = {
  sizzlings: [
    { name: "Sizzling Pork Sisig", image: "designs/sisig.jpg", prices: [{ label: "Solo", value: 109 }, { label: "Platter", value: 190 }] },
    { name: "Sizzling Pork Chop", image: "designs/porkchop.jpg", prices: [{ label: "Solo", value: 119 }, { label: "Platter", value: 190 }] },
    { name: "Sizzling Liempo", image: "designs/liempo.jpg", prices: [{ label: "Solo", value: 119 }, { label: "Platter", value: 190 }] },
    { name: "Sizzling Bangus Sisig", image: "designs/bangus.webp", prices: [{ label: "Solo", value: 139 }, { label: "Platter", value: 220 }] },
    { name: "Sizzling Chicken Katsu", image: "designs/katsu.jpg", prices: [{ label: "Solo", value: 139 }, { label: "Platter", value: 220 }] },
    { name: "Sizzling Spicy Chicken", image: "designs/chick.jpg", prices: [{ label: "Solo", value: 139 }, { label: "Platter", value: 220 }] },
    { name: "Sizzling Garlic Pepper Beef", image: "designs/garlic.webp", prices: [{ label: "Solo", value: 139 }, { label: "Platter", value: 220 }] },
    { name: "UNLI RICE SIZZLING", image: "designs/rice.jpg", prices: [{ label: "Unli Rice", value: 35 }] }
  ],
  silog: [
    { name: "TapSilog", image: "designs/tapsilog.jpg" },
    { name: "ChickSilog", image: "designs/chicksilog.jpg" },
    { name: "LiempoSilog", image: "designs/liemposilog.jpg" },
    { name: "PorkSilog", image: "designs/porksilog.jpg" },
    { name: "BangSilog", image: "designs/bangsilog.jpg" },
    { name: "HotSilog", image: "designs/hotsilog.jpg" },
    { name: "SpamSilog", image: "designs/spamsilog.jpg" }
  ],
  chao: [
    { name: "Chao Fan Pork Siomai", image: "designs/chaopork.jpg" },
    { name: "Chao Fan Beef Siomai", image: "designs/chaobeef.jpg" },
    { name: "Chao Fan Dumplings", image: "designs/chaodumplings.jpg" },
    { name: "Chao Fan Shanghai", image: "designs/chaoshanghai.jpg" },
    { name: "5 pcs Beef Siomai", image: "designs/beefsiomai.jpg" },
    { name: "5 pcs Pork Siomai", image: "designs/porksiomai.jpg" },
    { name: "5 pcs Japanese Siomai", image: "designs/japsiomai.jpg" },
    { name: "5 pcs Dumplings", image: "designs/dumplings.jpg" },
    { name: "5 pcs Gyoza", image: "designs/gyoza.jpg" },
    { name: "5 pcs Shanghai", image: "designs/shanghai.jpg" }
  ],
  other: [
    { name: "Lomi Batangas", image: "designs/lomi.jpg", prices: [{ label: "Regular", value: 99 }, { label: "Special", value: 105 }, { label: "Overload", value: 399 }] },
    { name: "Bulalo", image: "designs/bulalo.jpg", prices: [{ label: "Solo", value: 145 }, { label: "For Sharing", value: 380 }] },
    { name: "Braised Beef", image: "designs/braisedbeef.jpg", prices: [{ label: "Solo", value: 169 }, { label: "w/ Drinks", value: 189 }] },
    { name: "Extra Rice", image: "designs/rice.jpg" },
    { name: "Bento Boxes (20+ Orders)", image: "designs/bento.jpg", prices: [{ label: "Depends on Menu", value: 150 }, { label: "Depends on Menu", value: 250 }] },
    { name: "Catering Foods", image: "designs/catering.jpg" }
  ],
  drinks: [
    { name: "1 Pitcher of Iced Tea", image: "designs/icedtea.jpg" },
    { name: "1 Pitcher of Lemonade", image: "designs/lemonade.jpg" },
    { name: "Fruit Soda Strawberry", image: "designs/soda_strawberry.jpg" },
    { name: "Fruit Soda Green Apple", image: "designs/soda_apple.jpg" },
    { name: "Fruit Soda Lychee", image: "designs/soda_lychee.jpg" },
    { name: "Fruit Soda Blueberry", image: "designs/soda_blueberry.jpg" }
  ]
};

// ----- STOCKS PAGE -----
if (window.location.pathname.includes("stocks.html")) {
  const container = document.getElementById("stock-container");
  const saveButton = document.createElement("button");
  saveButton.textContent = "💾 Save All Changes";
  saveButton.className = "save-btn";
  container.parentElement.insertBefore(saveButton, container);

  const savedStocks = JSON.parse(localStorage.getItem("menuStocks")) || [];
  const stockMap = {};
  savedStocks.forEach(s => (stockMap[s.name] = s.stock));

  const allItems = [];

  Object.keys(menuData).forEach(category => {
    menuData[category].forEach(item => {
      if (item.prices) {
        item.prices.forEach(variant => {
          const name = `${item.name} - ${variant.label}`;
          const stock = stockMap[name] ?? 0;
          allItems.push({ name, image: item.image, stock });
        });
      } else {
        const name = item.name;
        const stock = stockMap[name] ?? 0;
        allItems.push({ name, image: item.image, stock });
      }
    });
  });

  function renderStockItems() {
    container.innerHTML = "";
    allItems.forEach((item, index) => {
      const box = document.createElement("div");
      box.className = "item-box";
      box.innerHTML = `
        <img src="${item.image || 'designs/default.jpg'}" alt="${item.name}" />
        <strong>${item.name}</strong>
        <input type="number" min="0" value="${item.stock}" id="stock-${index}" />
        <span class="${item.stock <= 10 ? 'low' : ''}">
          ${item.stock <= 10 ? 'LOW STOCK' : ''}
        </span>
      `;
      container.appendChild(box);
    });
  }

  saveButton.addEventListener("click", () => {
    const updated = allItems.map((item, index) => {
      const newStock = parseInt(document.getElementById(`stock-${index}`).value) || 0;
      return { name: item.name, stock: newStock };
    });
    localStorage.setItem("menuStocks", JSON.stringify(updated));
    alert("✅ All stocks updated!");
    renderStockItems();
  });

  renderStockItems();
}
