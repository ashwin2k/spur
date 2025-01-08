# Spur App Demo

> Make sure node is installed. Or else use a node manager like NVM.

1. In order to install the app, run `npm install --force`.
2. Create a Supabase account in https://supabase.com/
3. Create a `.env.local` file and add the following

   ```
   NEXT_PUBLIC_SUPABASE_URL = <SUPABASE_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY = <ANON_KEY>
   ```

   Make sure you replace `<SUPABASE_URL>` `<ANON_KEY>` with the variables in https://supabase.com/dashboard

4. Run `npm run dev`
