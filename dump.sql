--
-- PostgreSQL database dump (Remedy)
--
DROP SCHEMA IF EXISTS remedy CASCADE;

CREATE SCHEMA remedy;

DROP TABLE IF EXISTS gc_user;
DROP TABLE IF EXISTS gc_linked;
DROP TABLE IF EXISTS gc_medreminder;
DROP TABLE IF EXISTS gc_appreminder;

--
-- Name: gc_appreminder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_appreminder (
                                       id SERIAL NOT NULL,
                                       start timestamp without time zone NOT NULL,
                                       stop timestamp without time zone,
                                       timeout integer NOT NULL,
                                       purpose character varying(50),
                                       cancelled bit(1),
                                       reminderMsg character varying(50),
                                       patientId integer,
                                       createdAt timestamp without time zone NOT NULL,
                                       updatedAt timestamp without time zone NOT NULL
);



--
-- Name: gc_linked; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_linked (
                                  uidLinked integer NOT NULL,
                                  uidLinker integer NOT NULL,
                                  verified  boolean NOT NULL ,
                                  createdAt timestamp without time zone NOT NULL,
                                  updatedAt timestamp without time zone NOT NULL
);


--
-- Name: gc_medreminder; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_medreminder (
                                       id SERIAL NOT NULL,
                                       "time" timestamp without time zone NOT NULL,
                                       timeout integer NOT NULL,
                                       brandName character varying(50) NOT NULL,
                                       genericName character varying(50) NOT NULL,
                                       verified bit(1),
                                       reminderMsg character varying(50),
                                       patientId integer,
                                       createdAt timestamp without time zone NOT NULL,
                                       updatedAt timestamp without time zone NOT NULL
);



--
-- Name: gc_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE remedy.gc_user (
                                uid SERIAL NOT NULL,
                                email character varying(50) NOT NULL,
                                hashedpass character varying(50) NOT NULL,
                                salt character varying(50) NOT NULL,
                                role character varying(50) NOT NULL,
                                createdAt timestamp without time zone NOT NULL,
                                updatedAt timestamp without time zone NOT NULL
);



--
-- Name: gc_appreminder gc_appreminder_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_appreminder
    ADD CONSTRAINT gc_appreminder_pkey PRIMARY KEY (id);


--
-- Name: gc_linked gc_linked_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_linked
    ADD CONSTRAINT gc_linked_pkey PRIMARY KEY (uidLinked, uidLinker);


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
    ADD CONSTRAINT fk_linked FOREIGN KEY (uidLinked) REFERENCES remedy.gc_user(uid);


--
-- Name: gc_linked fk_linker; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_linked
    ADD CONSTRAINT fk_linker FOREIGN KEY (uidLinker) REFERENCES remedy.gc_user(uid);


--
-- Name: gc_medreminder fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_medreminder
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientId) REFERENCES remedy.gc_user(uid) ON DELETE SET NULL;


--
-- Name: gc_appreminder fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY remedy.gc_appreminder
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientId) REFERENCES remedy.gc_user(uid) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

