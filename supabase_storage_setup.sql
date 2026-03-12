-- SQL to set up Supabase Storage for product images
-- Run this in the Supabase SQL Editor

-- 1. Create a bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- 2. Allow public access to images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'product-images' );

-- 3. Allow authenticated users to upload images
create policy "Authenticated Upload"
on storage.objects for insert
with check (
    bucket_id = 'product-images' 
    and auth.role() = 'authenticated'
);

-- 4. Allow authenticated users to delete images
create policy "Authenticated Delete"
on storage.objects for delete
using (
    bucket_id = 'product-images' 
    and auth.role() = 'authenticated'
);
