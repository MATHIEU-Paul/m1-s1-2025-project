import { Pagination, Radio, Select, Space, Typography } from 'antd'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export type ListSortOrder = 'ASC' | 'DESC'

type SortOption<TSortField extends string> = {
  value: TSortField
  label: string
}

type PaginationConfig = {
  current: number
  pageSize: number
  total: number
  onChange: (page: number, pageSize: number) => void
  pageSizeOptions?: number[]
  entityLabel?: string
}

type QueryableListProps<TSortField extends string, TItem> = {
  sortLabel: string
  initialSortField: TSortField
  initialSortOrder?: ListSortOrder
  initialPage?: number
  initialPageSize?: number
  sortOptions: SortOption<TSortField>[]
  onQueryChange: (query: QueryableListQuery<TSortField>) => void
  items: TItem[]
  getItemKey: (item: TItem) => string
  renderItem: (item: TItem) => ReactNode
  listStyle?: CSSProperties
  totalCount: number
  pageSizeOptions?: number[]
  entityLabel?: string
}

export type QueryableListQuery<TSortField extends string> = {
  sortField: TSortField
  sortOrder: ListSortOrder
  page: number
  pageSize: number
  limit: number
  offset: number
}

export function QueryableList<TSortField extends string, TItem>({
  sortLabel,
  initialSortField,
  initialSortOrder = 'ASC',
  initialPage = 1,
  initialPageSize = 10,
  sortOptions,
  onQueryChange,
  items,
  getItemKey,
  renderItem,
  listStyle,
  totalCount,
  pageSizeOptions,
  entityLabel,
}: QueryableListProps<TSortField, TItem>) {
  const [sortField, setSortField] = useState<TSortField>(initialSortField)
  const [sortOrder, setSortOrder] = useState<ListSortOrder>(initialSortOrder)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const onQueryChangeRef = useRef(onQueryChange)

  useEffect(() => {
    onQueryChangeRef.current = onQueryChange
  }, [onQueryChange])

  useEffect(() => {
    onQueryChangeRef.current({
      sortField,
      sortOrder,
      page,
      pageSize,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })
  }, [sortField, sortOrder, page, pageSize])

  const onSortFieldChange = (value: TSortField) => {
    setSortField(value)
    setPage(1)
  }

  const onSortOrderChange = (value: ListSortOrder) => {
    setSortOrder(value)
    setPage(1)
  }

  const onPageChange = (nextPage: number, nextPageSize: number) => {
    const hasPageSizeChanged = nextPageSize !== pageSize
    const effectivePage = hasPageSizeChanged ? 1 : nextPage

    setPage(effectivePage)
    setPageSize(nextPageSize)
  }

  const pagination: PaginationConfig = {
    current: page,
    pageSize,
    total: totalCount,
    onChange: onPageChange,
    pageSizeOptions,
    entityLabel,
  }

  return (
    <>
      <Space
        align="center"
        wrap
        style={{
          width: '100%',
          justifyContent: 'space-between',
          padding: '0 .5rem',
          marginTop: '1rem',
          marginBottom: '.5rem',
        }}
      >
        <Typography.Text strong>{sortLabel}</Typography.Text>
        <Space align="center" wrap>
          <Select<TSortField>
            value={sortField}
            onChange={value => onSortFieldChange(value as TSortField)}
            style={{ width: 180 }}
            options={sortOptions}
          />
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            value={sortOrder}
            onChange={event => onSortOrderChange(event.target.value as ListSortOrder)}
            options={[
              { label: 'Ascending', value: 'ASC' },
              { label: 'Descending', value: 'DESC' },
            ]}
          />
        </Space>
      </Space>

      <div style={listStyle ?? { padding: '0 .5rem' }}>
        {items.map(item => (
          <div key={getItemKey(item)}>{renderItem(item)}</div>
        ))}
      </div>

      <div style={{ padding: '0 .5rem 1rem .5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={pagination.onChange}
          showSizeChanger
          pageSizeOptions={pagination.pageSizeOptions ?? [5, 10, 20, 50]}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} ${pagination.entityLabel ?? 'items'}`
          }
        />
      </div>
    </>
  )
}
