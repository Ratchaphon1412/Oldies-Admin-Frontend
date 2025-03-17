<script lang="ts" setup>
    import type { ColumnDef } from '@tanstack/vue-table'
    import {
        FlexRender,
        getCoreRowModel,
        useVueTable,
    } from '@tanstack/vue-table'
    import { useIntervalFn } from '@vueuse/core'
    import { Button } from '@/components/ui/button'

    const { getAdminListBookingAPI } = dashboardAPI()

    type userType = {
        account: {
            email: string
        }
        first_name: string
        last_name: string
        gender: string
        birth_date: string
    }

    type Price = {
        id?: number
        currency: string
        price: number
    }

    type Category = {
        id?: number
        name: string
        code?: string
        icon?: string
    }


    type Package = {
        id: string;
        name: string;
        short_description: string;
        image: string;
        category: Category;
        prices: Price[];
        slug: string;
        approved: boolean;
        status: string;
    }

    interface Booking {
        id: string
        package: Package
        user: userType
        date: string | null
        time: string | null
        status: string
        address: string | null
        price: Price
        qrcode: string | null
        qr_token: string
        cancel_reason: string | null
        is_service: boolean
    }

    const booking = await getAdminListBookingAPI()
    const data = ref<Booking[]>(booking.data.results)

    const keepPage = ref(1)

    useIntervalFn(async () => {
        await getAdminListBookingAPI(`?limit=15&offset=${(keepPage.value- 1) * 15}`).then((res) => {
            data.value = res.data.results
        })
    }, 60000)

    const columns: ColumnDef<Booking>[] = [
        {
            accessorKey: 'id',
            header: () => h('div', 'BOOKING ID'),
            cell:({ row }) => {
            return h('p', { class: 'font-medium line-clamp-3' }, row.getValue('id'))
            }
        },
        {
            accessorKey: 'package',
            header: () => h('div', 'PACKAGE ID'),
            cell:({ row }) => {
                const packageData = row.getValue('package') as Package;
                return h('p', { class: 'font-medium line-clamp-3' }, packageData.id)
            }
        },
        {
            accessorKey: 'category',
            header: () => h('div', 'CATEGORY'),
            cell:({ row }) => {
                const packageData = row.getValue('package') as Package;
                return h('p', { class: 'font-medium line-clamp-3' }, packageData.category.name)
            }
        },
        {
            accessorKey: 'user',
            header: () => h('div', 'USER'),
            cell:({ row }) => {
                const userData = row.getValue('user') as userType;
                return h('p', { class: 'font-medium line-clamp-3' }, userData.first_name + ' ' + userData.last_name)
            }
        },
        {
            accessorKey: 'status',
            header: () => h('div', 'STATUS'),
            cell: ({ row }) => {
                switch (row.getValue('status')) {
                case 'information':
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-[#CCFBF1] text-[#115E59]' }, 'Information')
                case 'waiting_payment':
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-violet-600 text-white' }, 'Waiting Payment')
                case 'waiting_facilitator_approve':
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-[#FEF9C3] text-[#854D0E]' }, 'Waiting Facilitator Approve')
                case 'waiting_for_service':
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-teal-400 text-white' }, 'Waiting For Service')
                case 'reject':
                    return h('div', { class: 'gap-2' } ,[
                        h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-[#FEE2E2] text-[#991B1B]' }, 'Reject'),
                        h(Button, { 
                            class: 'w-max p-1 text-xs font-semibold border-0 shadow-none bg-transparent hover:bg-transparent text-[#39CCCC] underline', 
                            variant: 'link', 
                            onClick: () => {console.log('status Reject and this is a reason.')} 
                        }, 'Check Reason'),
                    ])
                case 'completed':
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-teal-400 text-white' }, 'Completed')
                default:
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full text-[#FFA500]' }, 'unknown')
                }
            }
        },
        {
            accessorKey: 'date',
            header: () => h('div', 'DATE'),
            cell:({ row }) => {
                return h('p', { class: 'font-medium line-clamp-3' }, row.getValue('date'))
            }
        },
        {
            accessorKey: 'price',
            header: () => h('div', 'PRICE'),
            cell:({ row }) => {
                const priceData = row.getValue('price') as Price;
                return h('p', { class: 'font-medium line-clamp-3' }, priceData.price + ' ' + priceData.currency)
            }
        }
    ]

    async function packagePaginate(page: number) {
        const offset = (page - 1) * 15
        const limit = 15
        await getAdminListBookingAPI(`?limit=${limit}&offset=${offset}`).then((res) => {
          data.value = res.data.results
        })
    }

    const table = useVueTable({
        get data() { return data },
        get columns() { return columns },
        getCoreRowModel: getCoreRowModel(),
    })
</script>

<template>
    <Card>
        <CardHeader class="px-7">
            <CardTitle>Booking</CardTitle>
            <CardDescription>
                Recent orders from your store.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader class="bg-gray-100 text-gray-500">
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender
                            v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow
                            v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined"
                        >
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                        <TableCell :colspan="columns.length" class="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
            <Pagination v-slot="{ page }" :total="booking.data.count" :items-per-page="15" :sibling-count="1" show-edges :default-page="1">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationPrev 
                    @click="() => {
                        packagePaginate(page-1)
                        keepPage = page - 1
                    }"
                />
                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button 
                                class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" 
                                @click="() => {
                                    packagePaginate(item.value)
                                    keepPage = item.value
                                }"
                            >
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>
                <PaginationNext 
                    @click="() => {
                        packagePaginate(page+1)
                        keepPage = page + 1
                    }"
                />
                </PaginationList>
            </Pagination>
        </CardContent>
    </Card>
</template>