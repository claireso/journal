const clsx = (arrCls: Array<string | undefined>) => arrCls.filter(Boolean).join(' ')

export default clsx
