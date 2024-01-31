document.addEventListener("alpine:init", () => {
  Alpine.data("menus", () => ({
    items: [
      { id: 1, name: "Kapal Api", img: "menu1.jpeg", price: 3000 },
      { id: 2, name: "Kapal Api Gula Aren", img: "menu2.jpeg", price: 3000 },
      { id: 3, name: "Indocafe Coffeemix", img: "menu3.jpeg", price: 3000 },
      { id: 4, name: "ABC Susu", img: "menu4.jpeg", price: 4000 },
      { id: 5, name: "Nurdin", img: "menu5.jpeg", price: 5000 },
      { id: 6, name: "Temulawak Botol", img: "menu6.jpeg", price: 5000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang sama di cart
      const cardItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if (!cardItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yg di cart
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan id nya
      const cardItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cardItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cardItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cardItem.price;
      }
    },
  });
});

// Konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
