<script setup>
import {
  Home,
  // MessageCircleMore,
  // Package,
  // CreditCard,
  // ShoppingCart,
  // Users2,
} from 'lucide-vue-next'
</script>
<template>
    <div class="flex min-h-screen w-full flex-col bg-muted/40">
        <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
                <a
                href="#"
                class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                <!-- <Package2 class="h-4 w-4 transition-all group-hover:scale-110" /> -->
                 <Logo class="h-8 w-auto" />
                <span class="sr-only">Acme Inc</span>
                </a>
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                    <NuxtLink
                        to="/"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Home class="h-5 w-5" />
                        <span class="sr-only">Dashboard</span>
                    </NuxtLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Dashboard
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                <!-- <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                    <NuxtLink
                        to="/bookings"
                        class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <ShoppingCart class="h-5 w-5" />
                        <span class="sr-only">Bookings</span>
                    </NuxtLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Bookings
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>

                
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                    <NuxtLink
                        to="/"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Package class="h-5 w-5" />
                        <span class="sr-only">Packages</span>
                    </NuxtLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Packages
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                        <a
                            href="#"
                            class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <CreditCard class="h-5 w-5" />
                            <span class="sr-only">Transactions</span>
                        </a>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Transactions
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                    <NuxtLink
                        to="/"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Users2 class="h-5 w-5" />
                        <span class="sr-only">Facilitator</span>
                    </NuxtLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Facilitator
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger as-child>
                    <NuxtLink
                        to="https://chatwoot.oldiesth.com/"
                        class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <MessageCircleMore class="h-5 w-5" />
                        <span class="sr-only">Chat</span>
                    </NuxtLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        Chat
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider> -->
            </nav>
        </aside>
            <slot />
    </div>
</template>