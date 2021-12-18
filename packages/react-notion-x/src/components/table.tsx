import React from 'react'
import {
  TableBlock as TableBlockType,
  Block as BlockType
} from 'notion-types'

import { cs } from '../utils'
import { useNotionContext } from '../context'
import { Text } from './text'

export const Table: React.FC<{
  block: BlockType
  className?: string
}> = ({ block, className }) => {
  const { recordMap } = useNotionContext()
  const tableBlock = block as TableBlockType

  if (!tableBlock) return null

  // block content ids
  const propertyIds = tableBlock.content
  console.log(JSON.stringify(tableBlock))
  // column name in order
  const columnNames = tableBlock.format?.table_block_column_order
  // if has header
  const rowHeader = !!(tableBlock.format?.table_block_column_header)
  const columnHeader = !!(tableBlock.format?.table_block_row_header)

  const wapperStyle: React.CSSProperties = {
    display: 'flex'
  }
  const relativeStyle: React.CSSProperties = {
    position: 'relative'
  }

  const marginStyle: React.CSSProperties = {
    margin: '8px 0 8px 0',
    transform: 'translateX(-1px)',
    overflow: 'auto'
  }

  function isFirst(arr: string[], value: string): boolean {
    return arr.indexOf(value) === 0
  }

  return (
    <div className={cs('notion-table-block', className)}>
      <div style={wapperStyle}>
        <div style={marginStyle}>
          <div data-block-id={block.id} className='notion-selectable notion-table-block notion-table-tbody-selectable' style={relativeStyle}>
          </div>
          <table >
            <tbody>
              {propertyIds.map((id) => {
                const row = recordMap['block'][id]
                const properties = row.value?.properties
                let needHeader = false

                return (
                  <tr className="notion-table-row" key={id}>
                    {columnNames.map((name) => {

                      // 判断是否需要设置 header
                      if ((rowHeader && isFirst(propertyIds, id)) || (columnHeader && isFirst(columnNames, name))) {
                        needHeader = true
                      } else {
                        needHeader = false
                      }

                      // 如果 properties 不存在，说明有空行
                      const value = properties ? properties[name] : [['']]
                      return <td className={cs('notion-table-cell-container', needHeader ? 'notion-table-cell-header' : '')} key={name}>
                        <div className='notion-table-cell'>
                          <div className="notion-table-cell-text notranslate">
                            <Text value={value} block={block} />
                          </div>
                        </div></td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
