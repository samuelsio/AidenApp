--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bulletinboard; Type: TABLE; Schema: public; Owner: app_user
--

CREATE TABLE public.bulletinboard (
    post_id integer NOT NULL,
    content text NOT NULL,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    author_id integer,
    clan_id integer NOT NULL
);


ALTER TABLE public.bulletinboard OWNER TO app_user;

--
-- Name: bulletinboard_post_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE public.bulletinboard_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bulletinboard_post_id_seq OWNER TO app_user;

--
-- Name: bulletinboard_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE public.bulletinboard_post_id_seq OWNED BY public.bulletinboard.post_id;


--
-- Name: clans; Type: TABLE; Schema: public; Owner: app_user
--

CREATE TABLE public.clans (
    clan_id integer NOT NULL,
    clan_name character varying(255) NOT NULL,
    description text,
    creation_date date NOT NULL,
    leader_id integer,
    members_count integer DEFAULT 0,
    clan_background character varying(250),
    clan_image character varying(250)
);


ALTER TABLE public.clans OWNER TO app_user;

--
-- Name: clans_clan_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE public.clans_clan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clans_clan_id_seq OWNER TO app_user;

--
-- Name: clans_clan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE public.clans_clan_id_seq OWNED BY public.clans.clan_id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: app_user
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    content text NOT NULL,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    author_id integer,
    event_id integer NOT NULL
);


ALTER TABLE public.comments OWNER TO app_user;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_comment_id_seq OWNER TO app_user;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: app_user
--

CREATE TABLE public.events (
    event_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    event_date timestamp without time zone,
    creator_id integer,
    clan_id integer NOT NULL
);


ALTER TABLE public.events OWNER TO app_user;

--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE public.events_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_event_id_seq OWNER TO app_user;

--
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE public.events_event_id_seq OWNED BY public.events.event_id;


--
-- Name: membership; Type: TABLE; Schema: public; Owner: app_user
--

CREATE TABLE public.membership (
    membership_id integer NOT NULL,
    user_id integer NOT NULL,
    clan_id integer NOT NULL,
    joined_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.membership OWNER TO app_user;

--
-- Name: membership_membership_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE public.membership_membership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.membership_membership_id_seq OWNER TO app_user;

--
-- Name: membership_membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE public.membership_membership_id_seq OWNED BY public.membership.membership_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: app_user
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    gender character varying(10),
    last_logged_in timestamp without time zone,
    username character varying(255),
    displayname character varying(255),
    date_of_birth date,
    profilepic character varying(255),
    profilebackgroundpic character varying(255),
    followers integer DEFAULT 0,
    following integer DEFAULT 0,
    description character varying(255),
    CONSTRAINT users_dateofbirth_check CHECK ((date_of_birth <= CURRENT_DATE))
);


ALTER TABLE public.users OWNER TO app_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO app_user;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: bulletinboard post_id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.bulletinboard ALTER COLUMN post_id SET DEFAULT nextval('public.bulletinboard_post_id_seq'::regclass);


--
-- Name: clans clan_id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.clans ALTER COLUMN clan_id SET DEFAULT nextval('public.clans_clan_id_seq'::regclass);


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: events event_id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.events ALTER COLUMN event_id SET DEFAULT nextval('public.events_event_id_seq'::regclass);


--
-- Name: membership membership_id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership ALTER COLUMN membership_id SET DEFAULT nextval('public.membership_membership_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: bulletinboard; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY public.bulletinboard (post_id, content, creation_date, author_id, clan_id) FROM stdin;
2	Training sessions for all Knights clan members. Don’t miss out!	2024-09-17 11:52:33.337312	5	2
3	Join us for the annual gathering of Wizards. Exciting discussions ahead!	2024-09-17 11:52:33.337312	7	3
1	Looking for new members to join the Dragons clan. Apply now!	2024-09-17 11:52:33	3	1
5	latest comment	2024-09-20 10:30:14.737675	6	1
6	This is another test  comment on a different group	2024-09-20 10:32:44.579036	6	3
\.


--
-- Data for Name: clans; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY public.clans (clan_id, clan_name, description, creation_date, leader_id, members_count, clan_background, clan_image) FROM stdin;
1	Dragons	A clan of fierce warriors.	2024-01-15	3	50	\N	\N
2	Knights	Noble knights of the realm.	2023-06-22	5	35	\N	\N
3	Wizards	Masters of magical arts.	2024-03-10	7	40	\N	\N
5	wasd	Test Description	2024-09-19	6	5	wasd	wasd
6	wasd	Test Description	2024-09-19	6	5	wasd	wasd
7	wasd	Test Description	2024-09-20	6	5	wasd	wasd
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY public.comments (comment_id, content, creation_date, author_id, event_id) FROM stdin;
1	Excited for the tournament!	2024-09-17 11:52:52.382228	4	3
2	Looking forward to the feast!	2024-09-17 11:52:52.382228	6	2
3	Can’t wait for the duel!	2024-09-17 11:52:52.382228	8	3
4	This is a comment	2024-09-19 15:13:34.117251	6	12
5	This is a comment	2024-09-19 15:16:17.821768	6	12
7	This is a comment	2024-09-20 10:34:29.540706	6	12
6	This is a patched field	2024-09-19 15:16:18.864478	6	12
12	This is user: 30	2024-09-23 14:03:21.290476	30	15
13	This is user: 30	2024-09-23 14:03:22.667042	30	15
14	This is user: 30	2024-09-23 14:03:23.846332	30	15
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY public.events (event_id, title, description, event_date, creator_id, clan_id) FROM stdin;
1	Dragon Tournament	A grand tournament to test the skills of all Dragons members.	2024-09-30 14:00:00	3	1
2	Knights’ Feast	A feast to celebrate the achievements of the Knights clan.	2024-08-15 19:00:00	5	2
3	Wizard Duel	A thrilling duel between the top Wizards of the clan.	2024-10-05 16:00:00	7	3
4	epic gaming time	TestDescription	2024-09-19 13:54:31.567081	2	3
5	epic gaming time	TestDescription	2024-09-19 13:55:40.630192	2	3
6	epic gaming time	TestDescription	2024-09-19 14:01:07.417941	2	3
7	epic gaming time	TestDescription	2024-09-19 14:01:54.481452	2	3
8	epic gaming time	TestDescription	2024-09-19 14:05:29.340922	2	3
9	epic gaming time	TestDescription	2024-09-19 14:05:34.283432	2	3
10	epic gaming time	TestDescription	2024-09-19 14:11:27.496371	2	3
11	epic gaming time	TestDescription	2024-09-19 14:13:39.972502	2	1
12	epic gaming time	TestDescription	2024-09-19 14:13:42.272898	2	1
13	epic gaming time	TestDescription	2024-09-20 09:58:33.011178	2	1
\.


--
-- Data for Name: membership; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY public.membership (membership_id, user_id, clan_id, joined_at) FROM stdin;
1	1	1	2024-09-27 14:44:24.107425
2	2	1	2024-09-27 14:44:24.107425
4	4	2	2024-09-27 14:44:24.107425
5	5	2	2024-09-27 14:44:24.107425
6	6	2	2024-09-27 14:44:24.107425
7	7	3	2024-09-27 14:44:24.107425
8	8	3	2024-09-27 14:44:24.107425
9	9	3	2024-09-27 14:44:24.107425
10	10	1	2024-09-27 14:44:24.107425
11	11	1	2024-09-27 14:44:24.107425
12	12	2	2024-09-27 14:44:24.107425
18	12	1	2024-09-27 15:05:35.157211
3	3	1	2024-10-27 13:44:24.107
\.


--
-- Data for Name: membership; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY public.membership (membership_id, user_id, clan_id, joined_at) FROM stdin;
1	1	1	2024-09-27 14:44:24.107425
2	2	1	2024-09-27 14:44:24.107425
3	3	1	2024-09-27 14:44:24.107425
4	4	2	2024-09-27 14:44:24.107425
5	5	2	2024-09-27 14:44:24.107425
6	6	2	2024-09-27 14:44:24.107425
7	7	3	2024-09-27 14:44:24.107425
8	8	3	2024-09-27 14:44:24.107425
9	9	3	2024-09-27 14:44:24.107425
10	10	1	2024-09-27 14:44:24.107425
11	11	1	2024-09-27 14:44:24.107425
12	12	2	2024-09-27 14:44:24.107425
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY public.users (user_id, email, password, first_name, last_name, gender, last_logged_in, username, displayname, date_of_birth, profilepic, profilebackgroundpic, followers, following, description) FROM stdin;
2	admin@example.com	adminhash	Admin	User	Female	\N	\N	\N	\N	\N	\N	0	0	\N
1	NewUser@email.com	passwordhash	Test	User	Male	\N	\N	\N	\N	\N	\N	0	0	\N
3	email43234@email.com	hashedpassword	jared	herbert	male	\N	@atomicwaffles69420	AtomicWaffles	2003-06-30	https://placeholder.com/150	https://placeholder.com/396x168	1500	300	Aiden is an avid gamer and loves farming simulations.
4	john.smith@email.com	hashedpassword	John	Smith	male	\N	@twat	John Smith	1989-12-15	https://placeholder.com/150	https://placeholder.com/396x168	1992	2015	John enjoys browsing the web and staying updated.
5	john.doe@email.com	hashedpassword	John	Doe	male	\N	john_doe	John Doe	1985-05-01	https://placeholder.com/150	https://placeholder.com/396x168	1200	250	John is a casual gamer who takes breaks often.
6	jane.smith@email.com	hashedpassword	Jane	Smith	female	\N	jane_smith	Jane Smith	1992-07-21	https://placeholder.com/150	https://placeholder.com/396x168	800	150	Jane loves playing social deduction games with friends.
7	mike.jones@email.com	hashedpassword	Mike	Jones	male	\N	mike_jones	Mike Jones	1984-09-12	https://placeholder.com/150	https://placeholder.com/396x168	600	100	Mike enjoys single-player adventures and RPGs.
8	sara.connor@email.com	hashedpassword	Sara	Connor	female	\N	sara_connor	Sara Connor	1995-02-18	https://placeholder.com/150	https://placeholder.com/396x168	900	200	Sara is a competitive player who loves battle royale games.
9	luke.skywalker@email.com	hashedpassword	Luke	Skywalker	male	\N	luke_skywalker	Luke Skywalker	1977-04-14	https://placeholder.com/150	https://placeholder.com/396x168	300	50	Luke enjoys exploring vast open worlds.
10	harry.potter@email.com	hashedpassword	Harry	Potter	male	\N	harry_potter	Harry Potter	1980-07-31	https://placeholder.com/150	https://placeholder.com/396x168	2000	400	Harry is a fan of first-person shooters and competitive play.
11	tony.stark@email.com	hashedpassword	Tony	Stark	male	\N	tony_stark	Tony Stark	1970-05-29	https://placeholder.com/150	https://placeholder.com/396x168	1500	300	Tony enjoys strategy games and tech innovations.
12	bruce.wayne@email.com	hashedpassword	Bruce	Wayne	male	\N	bruce_wayne	Bruce Wayne	1972-02-19	https://placeholder.com/150	https://placeholder.com/396x168	1800	350	Bruce is a night owl who enjoys relaxing games.
13	clark.kent@email.com	hashedpassword	Clark	Kent	male	\N	clark_kent	Clark Kent	1978-06-18	https://placeholder.com/150	https://placeholder.com/396x168	1200	250	Clark loves building and creating in sandbox games.
14	peter.parker@email.com	hashedpassword	Peter	Parker	male	\N	peter_parker	Peter Parker	1990-08-10	https://placeholder.com/150	https://placeholder.com/396x168	700	150	Peter enjoys superhero games and action adventures.
15	natasha.romanoff@email.com	hashedpassword	Natasha	Romanoff	female	\N	natasha_romanoff	Natasha Romanoff	1984-11-22	https://placeholder.com/150	https://placeholder.com/396x168	1100	220	Natasha is a skilled player who excels in team-based games.
16	steve.rogers@email.com	hashedpassword	Steve	Rogers	male	\N	steve_rogers	Steve Rogers	1918-07-04	https://placeholder.com/150	https://placeholder.com/396x168	900	180	Steve enjoys classic games and nostalgic experiences.
17	wanda.maximoff@email.com	hashedpassword	Wanda	Maximoff	female	\N	wanda_maximoff	Wanda Maximoff	1993-03-02	https://placeholder.com/150	https://placeholder.com/396x168	1300	270	Wanda is a tactical player who loves competitive shooters.
18	johndoe@example.com	yourpassword	John	Doe	male	\N	johndoe	\N	1985-05-01	\N	\N	0	0	\N
26	21@example.com		Jane	Doe	female	\N	@newUser123456	\N	1985-05-01	\N	\N	0	0	\N
23	patched@email.com	$2b$10$jKtCuw722AxrBlmsd9M1DOQfIsOkXzIWwc2xAHWw2CIJQJ6iOfBrW	TestPatch2	TestPatch2	female	\N	@TestPatch2	TestPatch2	1985-05-01	\N	\N	0	0	I have a patched description description
35	aidenheath4042@outlook.com	$2b$10$mDC0dR1SMKDiXTE5d.9xDuoBTCxml86FkODyEsSwUchgJgI6Yx5Mu	Aiden	Heath	Male	\N	aidentopshot	\N	2003-12-24	\N	\N	0	0	\N
36	email@legitEmail.com	$2b$10$Kdu86xNGrIykk2ZgShWRquLY0538TGw9wXubr7RP9HkDHwyIiRkom	FirstName	LName	Other	\N	UsernameFromForm	\N	1980-12-16	\N	\N	0	0	\N
38	29@example.com	$2b$10$Ai8DezEwNTPG3f/JzEvlJe5/9fv0b68WMlLUZgps10ebk/zwRV3FC	Jane	Doe	female	\N	@DeleteMe123	\N	1985-05-01	\N	\N	0	0	\N
61	email69@legitEmail.com	$2b$10$KHXknnMACjczOYtQom70HOHTnD.JZaa8ZbmUt9EWYy9WaaQ0vkQKi	FirstName	LName	Other	\N	UsernameFromForm1	\N	1980-12-16	\N	\N	0	0	\N
65	Random1234@Random1234.com	$2b$10$s4DjPiQfCmUIXBi1OzlTpOjhtAC9QXIPCHIeAYCRpTJTIkUW0515S	Random1234!	Random1234!	Other	\N	Random1234!	\N	0001-01-01	\N	\N	0	0	\N
64	testLogin@testLogin.com	$2b$10$PweeYrA8bWLsb7aHYc0Ovunr5DtwnzVBOboAhZBe.VJHY24938hQ2	testLogin	testLogin	Male	\N	testLogin	@TestLogin	0001-01-01	\N	\N	0	0	\N
66	email@email.com	$2b$10$/IxePPfTmrA1KmHbsGSCDudXdDhLjnCJyALv8L0DHocCf2UY8VDT.	First Name	Last Name	Other	\N	BrandNew	\N	1212-12-12	\N	\N	0	0	\N
\.


--
-- Name: bulletinboard_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('public.bulletinboard_post_id_seq', 6, true);


--
-- Name: clans_clan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('public.clans_clan_id_seq', 7, true);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 7, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('public.events_event_id_seq', 13, true);


--
-- Name: membership_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('public.membership_membership_id_seq', 18, true);


--
-- Name: membership_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('public.membership_membership_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('public.users_user_id_seq', 66, true);


--
-- Name: bulletinboard bulletinboard_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.bulletinboard
    ADD CONSTRAINT bulletinboard_pkey PRIMARY KEY (post_id);


--
-- Name: clans clans_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.clans
    ADD CONSTRAINT clans_pkey PRIMARY KEY (clan_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: membership membership_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_pkey PRIMARY KEY (membership_id);


--
-- Name: membership membership_user_id_clan_id_key; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_user_id_clan_id_key UNIQUE (user_id, clan_id);


--
-- Name: membership membership_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_pkey PRIMARY KEY (membership_id);


--
-- Name: membership membership_user_id_clan_id_key; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_user_id_clan_id_key UNIQUE (user_id, clan_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: bulletinboard fk_author; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.bulletinboard
    ADD CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: comments fk_author; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: bulletinboard fk_clan; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.bulletinboard
    ADD CONSTRAINT fk_clan FOREIGN KEY (clan_id) REFERENCES public.clans(clan_id) ON DELETE CASCADE;


--
-- Name: events fk_clan; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_clan FOREIGN KEY (clan_id) REFERENCES public.clans(clan_id) ON DELETE CASCADE;


--
-- Name: events fk_creator; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_creator FOREIGN KEY (creator_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: comments fk_event; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON DELETE CASCADE;


--
-- Name: clans fk_leader; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.clans
    ADD CONSTRAINT fk_leader FOREIGN KEY (leader_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: membership membership_clan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_clan_id_fkey FOREIGN KEY (clan_id) REFERENCES public.clans(clan_id) ON DELETE CASCADE;


--
-- Name: membership membership_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: membership membership_clan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_clan_id_fkey FOREIGN KEY (clan_id) REFERENCES public.clans(clan_id) ON DELETE CASCADE;


--
-- Name: membership membership_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT membership_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO app_user;


--
-- PostgreSQL database dump complete
--

