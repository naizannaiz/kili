-- Migration: Add length and width dimensions to products table

-- 1. Add length column if it doesn't exist
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name='products' and column_name='length') then
        alter table public.products add column length text;
    end if;
end $$;

-- 2. Add width column if it doesn't exist
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name='products' and column_name='width') then
        alter table public.products add column width text;
    end if;
end $$;

-- Optional: You can also add a comment to the columns
comment on column public.products.length is 'The length of the product (e.g., 6 ft, 180 cm)';
comment on column public.products.width is 'The width of the product (e.g., 4 ft, 120 cm)';
