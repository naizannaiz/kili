-- SQL to set up the products table in Supabase
-- Run this in the Supabase SQL Editor

-- 1. Create the products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  cat text not null,
  price text not null,
  description text,
  img text
);

-- 2. Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- 3. Create policies
-- Allow everyone to view products
create policy "Allow public read access"
  on public.products for select
  using (true);

-- Allow authenticated users (admin) to manage products
create policy "Allow authenticated CRUD"
  on public.products for all
  using (auth.role() = 'authenticated');
