<script lang="ts" setup>
    import type { ColumnDef } from '@tanstack/vue-table'
    import {
        FlexRender,
        getCoreRowModel,
        useVueTable,
    } from '@tanstack/vue-table'
    import { Button } from '@/components/ui/button'
    import { useIntervalFn } from '@vueuse/core'

    const { getAdminListPackagesAPI } = dashboardAPI();
    const { getApprovePackageAPI } = approveAPI()

    type Category = {
        id?: number
        name: string
        code?: string
        icon?: string
    }

    type Price = {
        id?: number
        currency: string
        price: number
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

    const packages = await getAdminListPackagesAPI()
    const data = ref<Package[]>(packages.data.results)

    const config = useRuntimeConfig()

    const keepPage = ref(1)

    useIntervalFn(async () => {
        await getAdminListPackagesAPI(`?limit=15&offset=${(keepPage.value- 1) * 15}`).then((res) => {
            data.value = res.data.results
        })
    }, 60000)

    async function approve(pack: Package) {
        await getApprovePackageAPI(pack.id).then(async ({status}) => {
            if (status === 200) {
                await getAdminListPackagesAPI(`?limit=15&offset=${(keepPage.value- 1) * 15}`).then((res) => {
                    data.value = res.data.results
                })
            }
        })
    }

    const columns: ColumnDef<Package>[] = [
        {
            accessorKey: 'image',
            header: () => h('div', 'PRODUCT'),
            cell: ({ row }) => {
                return h('img',{ class: 'w-[100px] h-[80px] rounded-xl', src: config.public.mediaUrl +"/400x400/oldies-media/" + row.getValue('image') })
            }
        },
        {
            accessorKey: 'name',
            header: () => h('div', 'NAME'),
            cell:({ row }) => {
                return h('p', { class: 'font-medium line-clamp-3' }, row.getValue('image')? row.getValue('name') : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
            }
        },
        {
            accessorKey: 'category',
            header: () => h('div', { class: 'text-center' }, 'CATEGORY'),
            cell: ({ row }) => {
                return h('div', { class: 'text-center font-medium' }, (row.getValue('category') as Category).name)
            }
        },
        {
            accessorKey: 'prices',
            header: () => h('div', { class: 'w-max' }, 'TOTAL PRICE'),
            cell: ({ row }) => {
                return h('p', { class: 'w-max font-semibold' }, (row.getValue('prices') as Price[])[0].price + ' ' + (row.getValue('prices') as Price[])[0].currency)
            }
        },
        {
            accessorKey: 'status',
            header: () => h('div', 'STATUS'),
            cell: ({ row }) => {
                switch (row.getValue('status')) {
                case 'approved':
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-[#CCFBF1] text-[#115E59]' }, 'Publish')
                case 'waiting_approve':
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-[#FEF9C3] text-[#854D0E]' }, 'Waiting Approve')
                case 'reject':
                    return h('div', { class: 'gap-2' } ,[
                        h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full bg-[#FEE2E2] text-[#991B1B]' }, 'Reject'),
                        h(Button, { 
                            class: 'w-max p-1 text-xs font-semibold border-0 shadow-none bg-transparent hover:bg-transparent text-[#39CCCC] underline', 
                            variant: 'link', 
                            onClick: () => {console.log('status Reject and this is a reason.')} 
                        }, 'Check Reason'),
                    ])
                default:
                    return h('p', { class: 'w-max p-1 text-xs font-semibold rounded-full text-[#FFA500]' }, 'unknown')
                }
            }
        },
        {
            accessorKey: 'action',
            header: () => h('div', 'ACTION'),
            cell: ({ row }) => {
                if (row.getValue('status') === 'waiting_approve') {
                    return h(Button, { class: 'items-center bg-[#39CCCC] hover:bg-[#39CCCC] rounded-full',onClick: () => approve(row.original) }, [
                        h('p', { class: 'text-white' }, 'Approve')
                    ])
                }

                return h('')
            }
        }
    ]

    async function packagePaginate(page: number) {
        const  offset = (page - 1) * 15
        const limit = 15
        await getAdminListPackagesAPI(`?limit=${limit}&offset=${offset}`).then((res) => {
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
            <CardTitle>Package</CardTitle>
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
    
            <Pagination v-slot="{ page }" :total="packages.data.count" :items-per-page="15" :sibling-count="1" show-edges :default-page="1">
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