import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 1, name: 'Стейк Рибай', price: 2500, category: 'main', description: 'Сочный стейк из мраморной говядины', image: '/placeholder.svg' },
    { id: 2, name: 'Паста Карбонара', price: 850, category: 'main', description: 'Классическая итальянская паста', image: '/placeholder.svg' },
    { id: 3, name: 'Бургер Graf', price: 950, category: 'main', description: 'Фирменный бургер с трюфельным соусом', image: '/placeholder.svg' },
    { id: 4, name: 'Том Ям', price: 650, category: 'soups', description: 'Острый тайский суп с креветками', image: '/placeholder.svg' },
    { id: 5, name: 'Цезарь с курицей', price: 550, category: 'salads', description: 'Классический салат Цезарь', image: '/placeholder.svg' },
    { id: 6, name: 'Тирамису', price: 450, category: 'desserts', description: 'Итальянский десерт с маскарпоне', image: '/placeholder.svg' },
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient">Graf-in</h1>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">Главная</button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-primary transition-colors">Меню</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">О нас</button>
            <button onClick={() => scrollToSection('booking')} className="hover:text-primary transition-colors">Бронирование</button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-primary transition-colors">Галерея</button>
            <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
          </div>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Итого:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                        <Icon name="ArrowRight" size={20} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient animate-float">
            Graf-in
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Изысканная кухня и уютная атмосфера в центре города
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('menu')}>
              <Icon name="UtensilsCrossed" size={24} className="mr-2" />
              Меню
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('booking')}>
              <Icon name="Calendar" size={24} className="mr-2" />
              Забронировать столик
            </Button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-gradient">Наше меню</h2>
          
          <Tabs defaultValue="main" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="main">Основные блюда</TabsTrigger>
              <TabsTrigger value="soups">Супы</TabsTrigger>
              <TabsTrigger value="salads">Салаты</TabsTrigger>
              <TabsTrigger value="desserts">Десерты</TabsTrigger>
            </TabsList>
            
            {['main', 'soups', 'salads', 'desserts'].map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.filter(item => item.category === category).map(item => (
                    <Card key={item.id} className="overflow-hidden hover:scale-105 transition-transform duration-300 glass">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20" />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                          <Button onClick={() => addToCart(item)}>
                            <Icon name="Plus" size={20} className="mr-2" />
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-6 text-gradient">О нас</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Graf-in — это уютное пространство, где сочетаются авторская кухня и тёплая атмосфера. 
                Мы создаём блюда с любовью, используя только свежие и качественные продукты.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-lg">
                  <Icon name="Clock" size={32} className="text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Время работы</h4>
                  <p className="text-sm text-muted-foreground">Ежедневно 11:00 - 23:00</p>
                </div>
                <div className="glass p-4 rounded-lg">
                  <Icon name="Users" size={32} className="text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Вместимость</h4>
                  <p className="text-sm text-muted-foreground">До 80 гостей</p>
                </div>
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/1fe7bef7-63ef-4028-aee1-cb9e713c53d9.jpg" 
                alt="Интерьер ресторана Graf-in"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-5xl font-bold text-center mb-12 text-gradient">Бронирование столика</h2>
          <Card className="p-8 glass">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input placeholder="+7 (___) ___-__-__" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Дата</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Время</label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Количество гостей</label>
                <Input type="number" placeholder="2" min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Комментарий</label>
                <Textarea placeholder="Особые пожелания..." />
              </div>
              <Button size="lg" className="w-full">
                <Icon name="Calendar" size={20} className="mr-2" />
                Забронировать
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-gradient">Галерея</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src="https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/c9a96bbf-f393-4a42-a590-009c9687d6b0.jpg" alt="Блюдо" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src="https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/08994d25-2fd4-4c66-8498-da54a0aaf6f0.jpg" alt="Сервировка" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src="https://cdn.poehali.dev/projects/ce24c2ce-ca6e-4f11-a5e7-d2d60c15d7dc/files/1fe7bef7-63ef-4028-aee1-cb9e713c53d9.jpg" alt="Интерьер" className="w-full h-full object-cover" />
            </div>
            {[4, 5, 6, 7, 8].map((i) => (
              <div 
                key={i} 
                className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12 text-gradient">Контакты</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 glass text-center">
              <Icon name="MapPin" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Адрес</h3>
              <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
            </Card>
            <Card className="p-6 glass text-center">
              <Icon name="Phone" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Телефон</h3>
              <p className="text-muted-foreground">+7 (495) 123-45-67</p>
            </Card>
            <Card className="p-6 glass text-center">
              <Icon name="Mail" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">info@graf-in.ru</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Graf-in. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;