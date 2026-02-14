'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  QrCode, 
  Gift, 
  Users, 
  Bell, 
  CheckCircle, 
  ArrowRight,
  Store,
  BarChart3,
  UserPlus,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    emailDestino: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: '',
  });
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Las contraseñas no coinciden',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'La contraseña debe tener al menos 6 caracteres',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/negocio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          emailDestino: formData.emailDestino,
          password: formData.password,
          telefono: formData.telefono || undefined,
          direccion: formData.direccion || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar');
      }

      toast({
        title: '¡Registro exitoso!',
        description: 'Tu negocio ha sido registrado. Redirigiendo al panel...',
      });

      // Redirigir al panel de administración
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1500);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error al registrar el negocio',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: UserPlus,
      title: 'Registro Manual',
      description: 'Registra a tus clientes directamente desde el panel de administración.',
    },
    {
      icon: QrCode,
      title: 'Código QR Único',
      description: 'Tu negocio tiene un QR para que los clientes acumulen compras.',
    },
    {
      icon: Gift,
      title: 'Recompensas Automáticas',
      description: 'Cada 10 compras, el cliente gana una recompensa automáticamente.',
    },
    {
      icon: Bell,
      title: 'Notificaciones',
      description: 'Recibe alertas por Email y Telegram de nuevas recompensas.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Registra tu negocio',
      description: 'Crea tu cuenta en segundos con los datos básicos.',
    },
    {
      number: '2',
      title: 'Registra tus clientes',
      description: 'Agrega clientes manualmente desde el panel de administración.',
    },
    {
      number: '3',
      title: 'Imprime tu QR',
      description: 'Descarga e imprime tu código QR para colocarlo en la caja.',
    },
    {
      number: '4',
      title: '¡Listo!',
      description: 'Los clientes escanean el QR y acumulan compras automáticamente.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">FideliQR</span>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="gap-2">
              <Store className="w-4 h-4" />
              Acceder
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50 to-background dark:from-emerald-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gift className="w-4 h-4" />
              Sistema de Fidelización Digital
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premia a tus clientes{' '}
              <span className="text-emerald-600">leales</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Sistema simplificado de fidelización. Registra clientes manualmente y 
              deja que acumulen compras escaneando un código QR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#registro">
                <Button size="lg" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                  Registrar mi negocio
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button size="lg" variant="outline">
                  ¿Cómo funciona?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Todo lo que necesitas para fidelizar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simplified Flow */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Flujo Simplificado</CardTitle>
                <CardDescription>
                  Sin complicaciones, sin registro público
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <UserPlus className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">1. Registro de clientes</h3>
                    <p className="text-sm text-muted-foreground">
                      El dueño del negocio registra a los clientes manualmente desde el panel de administración con nombre, email y teléfono.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">2. Acumulación de compras</h3>
                    <p className="text-sm text-muted-foreground">
                      El cliente escanea el QR en cada compra e ingresa su email. El sistema suma automáticamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">3. Recompensas automáticas</h3>
                    <p className="text-sm text-muted-foreground">
                      Cada 10 compras, el sistema activa una recompensa y notifica al dueño.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">4. Canje de recompensas</h3>
                    <p className="text-sm text-muted-foreground">
                      El dueño canjea las recompensas desde el panel cuando el cliente las solicita.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="registro" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Registra tu negocio</CardTitle>
                <CardDescription>
                  Comienza a premiar a tus clientes en menos de 2 minutos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del negocio *</Label>
                    <Input
                      id="nombre"
                      placeholder="Ej: Café del Centro"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (para login y notificaciones) *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.emailDestino}
                      onChange={(e) => setFormData({ ...formData, emailDestino: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repetir contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono (opcional)</Label>
                    <Input
                      id="telefono"
                      placeholder="+52 55 1234 5678"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección (opcional)</Label>
                    <Input
                      id="direccion"
                      placeholder="Calle 123, Col. Centro"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registrando...' : 'Registrar negocio'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-foreground">FideliQR</span>
          </div>
          <p className="text-sm">
            Sistema de fidelización digital. Registro manual de clientes.
          </p>
        </div>
      </footer>
    </div>
  );
}
