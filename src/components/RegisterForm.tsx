'use client'
import { z } from 'zod'
import { GalleryVerticalEnd } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from 'lib/utils'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateUser } from 'features/user/hooks/useCreateUser'
import { useRouter } from 'next/navigation'

const registerSchema = z.object({
    email: z.string().email('Email invalido'),
    first_name: z.string().min(3, 'El nombre es obligatorio'),
    last_name: z.string().min(3, 'El apellido es obligatorio '),
    phone_number: z
        .string()
        .min(1, 'El número de teléfono es obligatorio')
        .regex(
            /^[+]?[(]?\d{1,4}[)]?[-\s.]?\d{1,4}[-\s.]?\d{1,9}$/,
            'Número de teléfono inválido'
        ),
    //phone_number: z.string().min(8, 'el numer de telefono no es valido'),
    address: z.string().min(3).optional(),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const { handleUserCreated } = useCreateUser()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
    })

    const onSubmit = async (data: RegisterFormData) => {
        await handleUserCreated(data)
        router.push('/')
    }

    return (
        // Quiero eliminar el padding, establecer en padding 0px
        <div
            className={cn('flex flex-col gap-6 p-0-important', className)}
            {...props}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>
                        <h1 className="text-xl font-bold">
                            Welcome to Acme Inc.
                        </h1>
                        <div className="text-center text-sm">
                            Do you have an account??{' '}
                            <Link
                                href="login/"
                                className="underline underline-offset-4"
                            >
                                To login
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">Name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                placeholder="Nombre"
                                required
                                {...register('first_name')}
                            />
                            {errors.first_name && (
                                <p className="text-sm text-red-500">
                                    {errors.first_name.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                placeholder="Apellido"
                                required
                                {...register('last_name')}
                            />
                            {errors.last_name && (
                                <p className="text-sm text-red-500">
                                    {errors.last_name.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="number_phone">Number phone</Label>
                            <Input
                                id="number_phone"
                                type="text"
                                placeholder="(XXX) XXX-XXXX"
                                required
                                {...register('phone_number')}
                            />
                            {errors.phone_number && (
                                <p className="text-sm text-red-500">
                                    {errors.phone_number.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                placeholder="Dirección"
                                {...register('address')}
                            />
                            {errors.address && (
                                <p className="text-sm text-red-500">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="******"
                                required
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </div>

                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Or
                        </span>
                    </div>

                    {/* <div className=" grid gap-4 sm:grid-cols-2  w-100">
                        <Button variant="outline" className="w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </div> */}
                </div>
            </form>

            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
