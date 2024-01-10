import { useEffect, useRef } from "react"

type Props = {
  indeterminate?: boolean
} & React.HTMLProps<HTMLInputElement>

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: Props) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}

export default IndeterminateCheckbox
