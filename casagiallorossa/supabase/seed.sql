-- 2) DOPO AVER CREATO LE TABELLE, INCOLLA QUESTO E RUN

insert into public.cities (slug,name,country,timezone,primary_language,whatsapp_url,telegram_url)
values
  ('roma','Roma','IT','Europe/Rome','it', NULL, NULL),
  ('milano','Milano','IT','Europe/Rome','it', NULL, NULL),
  ('napoli','Napoli','IT','Europe/Rome','it', NULL, NULL),
  ('torino','Torino','IT','Europe/Rome','it', NULL, NULL),

  ('londra','Londra','GB','Europe/London','en', NULL, NULL),
  ('new-york','New York','US','America/New_York','en', NULL, NULL),

  ('madrid','Madrid','ES','Europe/Madrid','it', NULL, NULL),
  ('atene','Atene','GR','Europe/Athens','it', NULL, NULL),
  ('vienna','Vienna','AT','Europe/Vienna','it', NULL, NULL),
  ('zurigo','Zurigo','CH','Europe/Zurich','it', NULL, NULL)
on conflict (slug) do nothing;

-- Doors (1 per city)
insert into public.doors (door_id, city_id, label, status)
select (c.slug || '-001') as door_id, c.id, 'Porta #001', 'active'
from public.cities c
where not exists (
  select 1 from public.doors d where d.door_id = (c.slug || '-001')
);
