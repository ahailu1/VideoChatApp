PGDMP     $                    z         	   videochat    14.1    14.1     
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16561 	   videochat    DATABASE     m   CREATE DATABASE videochat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE videochat;
                postgres    false            ╘            1259    499903 
   friendship    TABLE     í   CREATE TABLE public.friendship (
    requester_id integer NOT NULL,
    recipient_id integer NOT NULL,
    creation_date timestamp without time zone NOT NULL
);
    DROP TABLE public.friendship;
       public         heap    alexh    false            ╒            1259    516287    friendship_status    TABLE     ╥   CREATE TABLE public.friendship_status (
    status_code integer,
    requester_id integer NOT NULL,
    recipient_id integer NOT NULL,
    creation_date timestamp without time zone,
    specifier_id integer
);
 %   DROP TABLE public.friendship_status;
       public         heap    alexh    false            ╥            1259    393401 
   register_user    TABLE     Ñ   CREATE TABLE public.register_user (
    username character varying(50),
    password character varying(200),
    user_id integer NOT NULL,
    creation_date date
);
 !   DROP TABLE public.register_user;
       public         heap    postgres    false            ╤            1259    393400    register_user_user_id_seq    SEQUENCE     æ   CREATE SEQUENCE public.register_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.register_user_user_id_seq;
       public          postgres    false    210            	
           0    0    register_user_user_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.register_user_user_id_seq OWNED BY public.register_user.user_id;
          public          postgres    false    209            ╙            1259    417978    user_profile    TABLE     Z   CREATE TABLE public.user_profile (
    bio character varying(255),
    user_id integer
);
     DROP TABLE public.user_profile;
       public         heap    postgres    false            h           2604    393404    register_user user_id    DEFAULT     ~   ALTER TABLE ONLY public.register_user ALTER COLUMN user_id SET DEFAULT nextval('public.register_user_user_id_seq'::regclass);
 D   ALTER TABLE public.register_user ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    209    210    210            
          0    499903 
   friendship 
   TABLE DATA           O   COPY public.friendship (requester_id, recipient_id, creation_date) FROM stdin;
    public          alexh    false    212            
          0    516287    friendship_status 
   TABLE DATA           q   COPY public.friendship_status (status_code, requester_id, recipient_id, creation_date, specifier_id) FROM stdin;
    public          alexh    false    213                       0    393401 
   register_user 
   TABLE DATA           S   COPY public.register_user (username, password, user_id, creation_date) FROM stdin;
    public          postgres    false    210             
          0    417978    user_profile 
   TABLE DATA           4   COPY public.user_profile (bio, user_id) FROM stdin;
    public          postgres    false    211            

           0    0    register_user_user_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.register_user_user_id_seq', 5, true);
          public          postgres    false    209            l           2606    499907    friendship friendship_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT friendship_pkey PRIMARY KEY (requester_id, recipient_id);
 D   ALTER TABLE ONLY public.friendship DROP CONSTRAINT friendship_pkey;
       public            alexh    false    212    212            n           2606    516291 &   friendship_status friendship_status_pk 
   CONSTRAINT     |   ALTER TABLE ONLY public.friendship_status
    ADD CONSTRAINT friendship_status_pk PRIMARY KEY (requester_id, recipient_id);
 P   ALTER TABLE ONLY public.friendship_status DROP CONSTRAINT friendship_status_pk;
       public            alexh    false    213    213            j           2606    393406     register_user register_user_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.register_user
    ADD CONSTRAINT register_user_pkey PRIMARY KEY (user_id);
 J   ALTER TABLE ONLY public.register_user DROP CONSTRAINT register_user_pkey;
       public            postgres    false    210            q           2606    499913    friendship fk_recipient_id 
   FK CONSTRAINT     ï   ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT fk_recipient_id FOREIGN KEY (recipient_id) REFERENCES public.register_user(user_id);
 D   ALTER TABLE ONLY public.friendship DROP CONSTRAINT fk_recipient_id;
       public          alexh    false    212    210    3178            p           2606    499908    friendship fk_requester_id 
   FK CONSTRAINT     ï   ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT fk_requester_id FOREIGN KEY (requester_id) REFERENCES public.register_user(user_id);
 D   ALTER TABLE ONLY public.friendship DROP CONSTRAINT fk_requester_id;
       public          alexh    false    212    210    3178            r           2606    516302 /   friendship_status friendship_status_foreign_key 
   FK CONSTRAINT     ╨   ALTER TABLE ONLY public.friendship_status
    ADD CONSTRAINT friendship_status_foreign_key FOREIGN KEY (recipient_id, requester_id) REFERENCES public.friendship(recipient_id, requester_id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.friendship_status DROP CONSTRAINT friendship_status_foreign_key;
       public          alexh    false    213    212    212    3180    213            o           2606    417981    user_profile user_id_fk 
   FK CONSTRAINT     â   ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.register_user(user_id);
 A   ALTER TABLE ONLY public.user_profile DROP CONSTRAINT user_id_fk;
       public          postgres    false    3178    211    210            
   I   x£U╦╦└ └│Tæd°=j▒ :Γ19∩lî&fSlj<Ü-╤║V₧I°░]ûÄ▌₧£ó%á°±▌½ha╙a"zf┬ê      
   R   x£M╠┴
└ ┴7Tæ░╬╞g└╡ñ :bσà÷;ZÜW│ΩÅF┬Sù╨╬îh▐╡/dàÉ╛så⌠Çì?≥b7¬╙╩I!⌡p╫Θò▐√Ö┴          »   x£E╠╜é0àß╣╜VI┐R(îèbDê?─îJë(é(Mæ½59∩tÆτ,╩▓já!fZ%öÄ╚0å[±l?ƒFÅ-Y⌐Ω╡4╗`╞▌lG3╖älæ╬║Ve[τ▓½∙&ë1⌡
ôê²Eº╒½JoΓ+▐ª▄╛₧Σ≥┌ƒ≥à▐G▄hD¼⌠É╞DìS∩@┐µ≡≡φ 
╡∩vεdë╠ƒtî±.║63       
   /   x£╦H═╔╔W(╧/╩IQ(╔╚,V╚,╬U¿TH╩╠τ4ßè±π4σè╤πΓΓ /r          
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16561 	   videochat    DATABASE     m   CREATE DATABASE videochat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE videochat;
                postgres    false            ╘            1259    499903 
   friendship    TABLE     í   CREATE TABLE public.friendship (
    requester_id integer NOT NULL,
    recipient_id integer NOT NULL,
    creation_date timestamp without time zone NOT NULL
);
    DROP TABLE public.friendship;
       public         heap    alexh    false            ╒            1259    516287    friendship_status    TABLE     ╥   CREATE TABLE public.friendship_status (
    status_code integer,
    requester_id integer NOT NULL,
    recipient_id integer NOT NULL,
    creation_date timestamp without time zone,
    specifier_id integer
);
 %   DROP TABLE public.friendship_status;
       public         heap    alexh    false            ╥            1259    393401 
   register_user    TABLE     Ñ   CREATE TABLE public.register_user (
    username character varying(50),
    password character varying(200),
    user_id integer NOT NULL,
    creation_date date
);
 !   DROP TABLE public.register_user;
       public         heap    postgres    false            ╤            1259    393400    register_user_user_id_seq    SEQUENCE     æ   CREATE SEQUENCE public.register_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.register_user_user_id_seq;
       public          postgres    false    210            	
           0    0    register_user_user_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.register_user_user_id_seq OWNED BY public.register_user.user_id;
          public          postgres    false    209            ╙            1259    417978    user_profile    TABLE     Z   CREATE TABLE public.user_profile (
    bio character varying(255),
    user_id integer
);
     DROP TABLE public.user_profile;
       public         heap    postgres    false            h           2604    393404    register_user user_id    DEFAULT     ~   ALTER TABLE ONLY public.register_user ALTER COLUMN user_id SET DEFAULT nextval('public.register_user_user_id_seq'::regclass);
 D   ALTER TABLE public.register_user ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    209    210    210            
          0    499903 
   friendship 
   TABLE DATA           O   COPY public.friendship (requester_id, recipient_id, creation_date) FROM stdin;
    public          alexh    false    212   -       
          0    516287    friendship_status 
   TABLE DATA           q   COPY public.friendship_status (status_code, requester_id, recipient_id, creation_date, specifier_id) FROM stdin;
    public          alexh    false    213   å                  0    393401 
   register_user 
   TABLE DATA           S   COPY public.register_user (username, password, user_id, creation_date) FROM stdin;
    public          postgres    false    210   Φ        
          0    417978    user_profile 
   TABLE DATA           4   COPY public.user_profile (bio, user_id) FROM stdin;
    public          postgres    false    211   º       

           0    0    register_user_user_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.register_user_user_id_seq', 5, true);
          public          postgres    false    209            l           2606    499907    friendship friendship_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT friendship_pkey PRIMARY KEY (requester_id, recipient_id);
 D   ALTER TABLE ONLY public.friendship DROP CONSTRAINT friendship_pkey;
       public            alexh    false    212    212            n           2606    516291 &   friendship_status friendship_status_pk 
   CONSTRAINT     |   ALTER TABLE ONLY public.friendship_status
    ADD CONSTRAINT friendship_status_pk PRIMARY KEY (requester_id, recipient_id);
 P   ALTER TABLE ONLY public.friendship_status DROP CONSTRAINT friendship_status_pk;
       public            alexh    false    213    213            j           2606    393406     register_user register_user_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.register_user
    ADD CONSTRAINT register_user_pkey PRIMARY KEY (user_id);
 J   ALTER TABLE ONLY public.register_user DROP CONSTRAINT register_user_pkey;
       public            postgres    false    210            q           2606    499913    friendship fk_recipient_id 
   FK CONSTRAINT     ï   ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT fk_recipient_id FOREIGN KEY (recipient_id) REFERENCES public.register_user(user_id);
 D   ALTER TABLE ONLY public.friendship DROP CONSTRAINT fk_recipient_id;
       public          alexh    false    212    210    3178            p           2606    499908    friendship fk_requester_id 
   FK CONSTRAINT     ï   ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT fk_requester_id FOREIGN KEY (requester_id) REFERENCES public.register_user(user_id);
 D   ALTER TABLE ONLY public.friendship DROP CONSTRAINT fk_requester_id;
       public          alexh    false    212    210    3178            r           2606    516302 /   friendship_status friendship_status_foreign_key 
   FK CONSTRAINT     ╨   ALTER TABLE ONLY public.friendship_status
    ADD CONSTRAINT friendship_status_foreign_key FOREIGN KEY (recipient_id, requester_id) REFERENCES public.friendship(recipient_id, requester_id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.friendship_status DROP CONSTRAINT friendship_status_foreign_key;
       public          alexh    false    213    212    212    3180    213            o           2606    417981    user_profile user_id_fk 
   FK CONSTRAINT     â   ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.register_user(user_id);
 A   ALTER TABLE ONLY public.user_profile DROP CONSTRAINT user_id_fk;
       public          postgres    false    3178    211    210           
