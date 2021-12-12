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
  const rowHeader = tableBlock.format?.table_block_column_header
  const columnHeader = tableBlock.format?.table_block_row_header

  const wapperStyle: React.CSSProperties = {
    display: 'flex'
  }
  const relativeStyle: React.CSSProperties = {
    position: 'relative'
  }

  const marginStyle: React.CSSProperties = {
    margin: '8px 0 8px 0',
    transform: 'translateX(-1px)'
  }

  let rowFlag = true
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

                const tableDataStyle: React.CSSProperties = {
                  border: '1px solid rgb(233, 233, 231)',
                  position: 'relative',
                  verticalAlign: 'top',
                  minWidth: '120px',
                  maxWidth: '240px',
                  minHeight: '32px',
                }
                console.log('row', id, rowFlag)
                if (rowHeader && rowFlag) {
                  tableDataStyle.background = 'rgb(247, 246, 243)'
                  rowFlag = false
                }
                const bottomStyle: React.CSSProperties = {
                  borderBottom: 'none !important'
                }
                return (
                  <tr className="notion-table-row" key={id}  style={bottomStyle}>
                    {columnNames.map((name) => {
                      const cellStyle: React.CSSProperties = {
                        maxWidth: '100%',
                        width: '100%',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        caretColor: 'transparent',
                        backgroundColor: 'transparent',
                        fontSize: '14px',
                        lineHeight: '20px'
                      }
                      console.log('line', name, columnNames.indexOf(name), columnHeader && (columnNames.indexOf(name) === 0))
                      if (columnHeader && (columnNames.indexOf(name) === 0)) {
                        tableDataStyle.background = 'rgb(247, 246, 243)'
                      } else {
                        tableDataStyle.background = 'transparent'
                      }

                      // 如果 properties 不存在，说明有空行
                      const value = properties ? properties[name] : [['']]
                      return <td style={tableDataStyle} key={id + name}>
                        <div className="notion-table-cell">
                          <div className="notion-table-cell-text notranslate" style={cellStyle}>
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
