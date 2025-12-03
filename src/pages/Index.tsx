import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    category: "Основные блюда",
    name: "Стейк Рибай",
    description: "Премиальный стейк из мраморной говядины",
    price: 2800,
    image: "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/c9a96bbf-f393-4a42-a590-009c9687d6b0.jpg",
  },
  {
    id: 2,
    category: "Основные блюда",
    name: "Утиная грудка",
    description: "С апельсиновым соусом и овощами гриль",
    price: 1900,
    image: "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/08994d25-2fd4-4c66-8498-da54a0aaf6f0.jpg",
  },
  {
    id: 3,
    category: "Десерты",
    name: "Тирамису",
    description: "Классический итальянский десерт",
    price: 650,
    image: "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/c9a96bbf-f393-4a42-a590-009c9687d6b0.jpg",
  },
  {
    id: 4,
    category: "Напитки",
    name: "Авторский лимонад",
    description: "Из свежих цитрусовых с мятой",
    price: 450,
    image: "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/08994d25-2fd4-4c66-8498-da54a0aaf6f0.jpg",
  },
];

export default function Index() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Бронирование оформлено!\nИмя: ${name}\nТелефон: ${phone}\nГости: ${guests}\nДата: ${date}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">Graf-in</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm hover:opacity-60 transition-opacity">Главная</a>
            <a href="#about" className="text-sm hover:opacity-60 transition-opacity">О нас</a>
            <a href="#menu" className="text-sm hover:opacity-60 transition-opacity">Меню</a>
            <a href="#gallery" className="text-sm hover:opacity-60 transition-opacity">Галерея</a>
            <a href="#booking" className="text-sm hover:opacity-60 transition-opacity">Бронирование</a>
            <a href="#contacts" className="text-sm hover:opacity-60 transition-opacity">Контакты</a>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-[80px] md:text-[120px] lg:text-[160px] font-bold leading-none mb-6 animate-slide-in-left">
              Ресторан<br />Graf-in
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in">
              Авторская кухня в уютной атмосфере. Создаём незабываемые гастрономические впечатления.
            </p>
            <Button size="lg" className="group animate-zoom-in">
              Забронировать столик
              <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="flex gap-4 mt-12 animate-fade-in">
            <a href="#" className="text-sm hover:opacity-60 transition-opacity">Instagram</a>
            <a href="#" className="text-sm hover:opacity-60 transition-opacity">Facebook</a>
            <a href="#" className="text-sm hover:opacity-60 transition-opacity">VK</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 group animate-zoom-in">
              <div className="text-6xl font-bold mb-4">01</div>
              <h3 className="text-2xl font-bold mb-3">Авторская кухня</h3>
              <p className="text-muted-foreground group-hover:text-background/70">
                Уникальные блюда от шеф-повара с 15-летним опытом
              </p>
            </Card>

            <Card className="p-8 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 group animate-zoom-in [animation-delay:200ms]">
              <div className="text-6xl font-bold mb-4">02</div>
              <h3 className="text-2xl font-bold mb-3">Свежие продукты</h3>
              <p className="text-muted-foreground group-hover:text-background/70">
                Ежедневные поставки от проверенных фермерских хозяйств
              </p>
            </Card>

            <Card className="p-8 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 group animate-zoom-in [animation-delay:400ms]">
              <div className="text-6xl font-bold mb-4">03</div>
              <h3 className="text-2xl font-bold mb-3">Уютная атмосфера</h3>
              <p className="text-muted-foreground group-hover:text-background/70">
                Стильный интерьер и тёплый сервис для ваших встреч
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-16 mt-20 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">О ресторане</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Graf-in — это уютное пространство, где сочетаются авторская кухня и тёплая атмосфера. 
                Мы создаём блюда с любовью, используя только свежие и качественные продукты.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Наш ресторан вмещает до 80 гостей и работает ежедневно с 11:00 до 23:00.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  <span className="text-sm">11:00 - 23:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  <span className="text-sm">До 80 гостей</span>
                </div>
              </div>
            </div>
            <div className="aspect-square overflow-hidden animate-slide-in-right">
              <img 
                src="https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/1fe7bef7-63ef-4028-aee1-cb9e713c53d9.jpg" 
                alt="Интерьер ресторана"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 animate-fade-in">Меню</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden border-2 border-border hover:border-foreground transition-all duration-300 group animate-zoom-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{item.price} ₽</span>
                    <Button size="sm" variant="outline">Заказать</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 animate-fade-in">Галерея</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/c9a96bbf-f393-4a42-a590-009c9687d6b0.jpg",
              "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/08994d25-2fd4-4c66-8498-da54a0aaf6f0.jpg",
              "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/1fe7bef7-63ef-4028-aee1-cb9e713c53d9.jpg",
              "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/c9a96bbf-f393-4a42-a590-009c9687d6b0.jpg",
              "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/08994d25-2fd4-4c66-8498-da54a0aaf6f0.jpg",
              "https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/1fe7bef7-63ef-4028-aee1-cb9e713c53d9.jpg",
            ].map((img, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden border-2 border-border hover:border-foreground transition-all duration-300 animate-zoom-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center animate-fade-in">
            Бронирование
          </h2>
          <Card className="p-8 border-2 border-foreground animate-zoom-in">
            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  required
                  className="border-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="border-2"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Количество гостей</label>
                  <Input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="2"
                    min="1"
                    required
                    className="border-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Дата и время</label>
                  <Input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="border-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Комментарий</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Особые пожелания..."
                  rows={4}
                  className="border-2"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Забронировать столик
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="animate-slide-in-left">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">Контакты</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Адрес</div>
                    <div className="text-muted-foreground">
                      г. Москва, ул. Примерная, д. 123
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">info@graf-in.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Время работы</div>
                    <div className="text-muted-foreground">Ежедневно 11:00 - 23:00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-muted animate-slide-in-right flex items-center justify-center">
              <span className="text-muted-foreground">Карта</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Graf-in. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
