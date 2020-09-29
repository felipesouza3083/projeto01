
export function date(value) {
    return new Intl.DateTimeFormat(
        'pt-BR',
        {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }
    ).format(new Date(value));
}

export function currency(value) {
    return new Intl.NumberFormat(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(value);
}