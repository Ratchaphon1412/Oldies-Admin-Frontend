<script lang="ts" setup>
    import type { ColumnDef } from '@tanstack/vue-table'
    import {
        FlexRender,
        getCoreRowModel,
        useVueTable,
    } from '@tanstack/vue-table'

    type accountType = {
        email: string
    }

    type address = {
        id: string
        name: string
        street: string
        city: string
        state: string
        country: string
        zip: string
        latitude: number
        longitude: number
    }

    type Facilitator = {
        id: string;
        profile: string;
        short_description: string;
        slug: string;
        address: address
        name: string
        setup_status: string
        rejected_reason: string | null
        active: boolean
        account: accountType
    }

    const { getAdminFacilitatorListAPI } = dashboardAPI()

    const facilitators = await getAdminFacilitatorListAPI()
    const data = ref<Facilitator[]>(facilitators.data.results)

    const config = useRuntimeConfig()

    const columns: ColumnDef<Facilitator>[] = [
        {
            accessorKey: 'id',
            header: () => h('div', 'FACILITATOR ID'),
            cell:({ row }) => {
                return h('p', { class: 'font-medium line-clamp-3' }, row.getValue('id'))
            }
        },
        {
            accessorKey: 'profile',
            header: () => h('div', 'PROFILE'),
            cell: ({ row }) => {
                return h('img',{ class: 'w-[100px] h-[80px] rounded-xl', src: config.public.mediaUrl +"/400x400/oldies-media/" + row.getValue('profile') })
            }
        },
        {
            accessorKey: 'name',
            header: () => h('div', 'NAME'),
            cell:({ row }) => {
                return h('p', { class: 'font-medium line-clamp-3' }, row.getValue('name'))
            }
        },
        {
            accessorKey: 'email',
            header: () => h('div', 'EMAIL'),
            cell:({ row }) => {
                const account = row.getValue('account') as accountType
                return h('p', { class: 'font-medium line-clamp-3' }, account.email)
            }
        },
    ]

    async function packagePaginate(page: number) {
        const  offset = (page - 1) * 15
        const limit = 15
        await getAdminFacilitatorListAPI(`&limit=${limit}&offset=${offset}`).then((res) => {
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
            <CardTitle>facilitator</CardTitle>
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
    
            <Pagination v-slot="{ page }" :total="facilitators.data.count" :items-per-page="15" :sibling-count="1" show-edges :default-page="1">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationPrev @click="packagePaginate(page-1)" />
                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="packagePaginate(item.value)" >
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>
                <PaginationNext @click="packagePaginate(page+1)" />
                </PaginationList>
            </Pagination>
        </CardContent>
    </Card>
</template>