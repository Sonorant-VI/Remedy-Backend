--
-- PostgreSQL database dump (Remedy)
--
DROP SCHEMA IF EXISTS remedy CASCADE;

CREATE SCHEMA remedy;

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

DROP TABLE IF EXISTS gc_user;
DROP TABLE IF EXISTS gc_linked;
DROP TABLE IF EXISTS gc_medreminder;
DROP TABLE IF EXISTS gc_appreminder;

--
-- Name: gc_appreminder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_appreminder (
    id integer NOT NULL,
    start timestamp without time zone NOT NULL,
    stop timestamp without time zone,
    timeout integer NOT NULL,
    purpose character varying(50),
    cancelled bit(1),
    reminder_msg character varying(50),
    patient_id integer
);


--
-- Name: gc_appreminder_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE remedy.gc_appreminder ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME remedy.gc_appreminder_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: gc_linked; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_linked (
    uid_linked integer NOT NULL,
    uid_linker integer NOT NULL
);


--
-- Name: gc_medreminder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_medreminder (
    id integer NOT NULL,
    "time" timestamp without time zone NOT NULL,
    timeout integer NOT NULL,
    brand_name character varying(50) NOT NULL,
    generic_name character varying(50) NOT NULL,
    verified bit(1),
    reminder_msg character varying(50),
    patient_id integer
);


--
-- Name: gc_medreminder_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE remedy.gc_medreminder ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME remedy.gc_medreminder_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: gc_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_user (
    uid integer NOT NULL,
    email character varying(50) NOT NULL,
    hashed_pass character varying(50) NOT NULL,
    salt character varying(50) NOT NULL,
    role character varying(50) NOT NULL
);


--
-- Name: gc_user_uid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE remedy.gc_user ALTER COLUMN uid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME remedy.gc_user_uid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: gc_appreminder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY remedy.gc_appreminder (id, start, stop, timeout, purpose, cancelled, reminder_msg, patient_id) FROM stdin;
\.


--
-- Data for Name: gc_linked; Type: TABLE DATA; Schema: public; Owner: -
--

COPY remedy.gc_linked (uid_linked, uid_linker) FROM stdin;
\.


--
-- Data for Name: gc_medreminder; Type: TABLE DATA; Schema: public; Owner: -
--

COPY remedy.gc_medreminder (id, "time", timeout, brand_name, generic_name, verified, reminder_msg, patient_id) FROM stdin;
\.


--
-- Data for Name: gc_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY remedy.gc_user (uid, email, hashed_pass, salt, role) FROM stdin;
1	kieranmachale@hotmail.com	07dbb6e6832da0841dd79701200e4b179f1a9	f1dp1ngq0ry	active
3	lansovinc@outlook.com	09ffh2u29761nh0948jk09387099e8b290f2al	j9fs8nxv6bv	passive
2	karimabene@gmail.com	72vbnkjds921n2jk134b21j4k2b41	g5pl1jnh0cx	active
4	nikolaymalyshev@outlook.com	5j5152nj12nk25llnjwqr215001msa	k7vj6maa3dk	passive
5	yujinkwak@gmail.com	01lkp8924fh6e6mmafsaj9012421nmx91241mc92	r9ph5bcx2rr	active
6	minjikim@gmail.com	88bhy7f80129mskla01241nkl2h1nk2j14h0nsa0	x0jn7ksbom	active
\.


--
-- Name: gc_appreminder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('remedy.gc_appreminder_id_seq', 1, false);


--
-- Name: gc_medreminder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('remedy.gc_medreminder_id_seq', 1, false);


--
-- Name: gc_user_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('remedy.gc_user_uid_seq', 6, true);


--
-- Name: gc_appreminder gc_appreminder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_appreminder
    ADD CONSTRAINT gc_appreminder_pkey PRIMARY KEY (id);


--
-- Name: gc_linked gc_linked_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_linked
    ADD CONSTRAINT gc_linked_pkey PRIMARY KEY (uid_linked, uid_linker);


--
-- Name: gc_medreminder gc_medreminder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_medreminder
    ADD CONSTRAINT gc_medreminder_pkey PRIMARY KEY (id);


--
-- Name: gc_user gc_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_user
    ADD CONSTRAINT gc_user_pkey PRIMARY KEY (uid);


--
-- Name: gc_linked fk_linked; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_linked
    ADD CONSTRAINT fk_linked FOREIGN KEY (uid_linked) REFERENCES remedy.gc_user(uid);


--
-- Name: gc_linked fk_linker; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_linked
    ADD CONSTRAINT fk_linker FOREIGN KEY (uid_linker) REFERENCES remedy.gc_user(uid);


--
-- Name: gc_medreminder fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_medreminder
    ADD CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES remedy.gc_user(uid) ON DELETE SET NULL;


--
-- Name: gc_appreminder fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_appreminder
    ADD CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES remedy.gc_user(uid) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

