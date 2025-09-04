CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- public.post definition

-- Drop table

-- DROP TABLE public.post;

CREATE TABLE public.post (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	title varchar NOT NULL,
	hashtag varchar NOT NULL,
	"isPublished" bool DEFAULT false NOT NULL,
	"content" varchar NOT NULL,
	"userId" uuid NULL,
	CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY (id)
);


-- public."user" definition

-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user" (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	"isActive" bool DEFAULT true NOT NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
	CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email)
);

-- public.post foreign keys

ALTER TABLE public.post ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES public."user"(id);