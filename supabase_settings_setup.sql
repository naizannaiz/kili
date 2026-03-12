-- SQL to set up Site Settings in Supabase
-- Run this in the Supabase SQL Editor

-- 1. Create a table for site-wide settings
create table if not exists public.site_settings (
    id uuid default gen_random_uuid() primary key,
    key text unique not null,
    value text not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Insert the initial WhatsApp number
insert into public.site_settings (key, value)
values ('whatsapp_number', '919048911000')
on conflict (key) do update set value = excluded.value;

-- 3. Allow public read access to settings
create policy "Allow Public Read Access"
on public.site_settings for select
using ( true );

-- 4. Allow authenticated users (admins) to update settings
-- Assuming you have a standard auth setup
create policy "Allow Authenticated Update Access"
on public.site_settings for update
using ( auth.role() = 'authenticated' )
with check ( auth.role() = 'authenticated' );

-- 5. Allow authenticated users (admins) to insert settings
create policy "Allow Authenticated Insert Access"
on public.site_settings for insert
with check ( auth.role() = 'authenticated' );
