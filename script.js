document.addEventListener("DOMContentLoaded", function () {
  const cartContent = document.getElementById("cart-content");
  const cartBadge = document.querySelector(".badge");
  let cartItems = [];
  let cartTotal = 0;

  // Toggle cart visibility
  document.getElementById("shopping-cart").addEventListener("click", function () {
    cartContent.classList.toggle("active");
  });

  // Handle Add to Cart
  document.querySelectorAll(".food-menu-box form").forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const parent = form.closest(".food-menu-box");
      const foodName = parent.querySelector("h4").innerText;
      const foodPrice = parseFloat(parent.querySelector(".food-price").innerText.replace("$", ""));
      const qty = parseInt(parent.querySelector("input[type='number']").value);

      const totalItem = (foodPrice * qty).toFixed(2);

      cartItems.push({ foodName, foodPrice, qty, totalItem });
      cartTotal += foodPrice * qty;

      updateCartDisplay();
    });
  });

  function updateCartDisplay() {
    const tableRows = cartItems.map(item => {
      return `
        <tr>
          <td><img src="${getImageByName(item.foodName)}" alt="${item.foodName}" style="width:50px;height:50px;"></td>
          <td>${item.foodName}</td>
          <td>$${item.foodPrice.toFixed(2)}</td>
          <td>${item.qty}</td>
          <td>$${item.totalItem}</td>
          <td><a href="#" class="btn-delete" data-name="${item.foodName}">&times;</a></td>
        </tr>
      `;
    }).join("");

    const totalRow = `
      <tr>
        <th colspan="4">Total</th>
        <th>$${cartTotal.toFixed(2)}</th>
        <th></th>
      </tr>
    `;

    document.querySelector(".cart-table").innerHTML = `
      <tr>
        <th>Food</th>
        <th>Name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
      ${tableRows}
      ${totalRow}
    `;

    cartBadge.innerText = cartItems.length;
  }

  // Simple image fetcher (optional improvement)
  function getImageByName(name) {
    name = name.toLowerCase();
    if (name.includes("pizza")) return "pizza(1).jpg";
    if (name.includes("sandwich")) return "sandwich.jpg";
    if (name.includes("burger")) return "burger.jpg";
    return "default.jpg";
  }
});


  $(document).ready(function () {
    // Toggle cart content visibility
    $('#shopping-cart').click(function (e) {
      e.preventDefault();
      $('#cart-content').fadeToggle();
    });

    // Optional: Back to top button
    $('#back-to-top').hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#back-to-top').fadeIn();
      } else {
        $('#back-to-top').fadeOut();
      }
    });
    $('#back-to-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 600);
      return false;
    });
  });

