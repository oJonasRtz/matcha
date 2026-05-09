# Database

## How to enter the container

```bash
docker exec -it <container>  psql -U <user name> -d <database name>
```

### Consult tables
```bash
	#see all tables
	\dt
	#see table schema
	\d <table name> 
	\d+ <table name>
```

## Diagram

```mermaid
erDiagram

    USERS {
        int id PK
        string user_id
        string username
        string firstname
        string lastname
        string gender
        string sexual_orientation
        text bio
        int age
        int frame_rate
        boolean is_online
        timestamp last_online
    }

    AUTH {
        int id PK
        string email
        string password_hash
        int user_id FK
    }

    TAGS {
        int id PK
        string name
    }

    USER_TAGS {
        int user_id FK
        int tag_id FK
    }

    LIKES {
        int id PK
        int liker_id FK
        int liked_id FK
    }

    PROFILE_VIEWS {
        int id PK
        int viewer_id FK
        int viewed_id FK
        timestamp viewed_at
    }

    BLOCKS {
        int id PK
        int blocker_id FK
        int blocked_id FK
    }

    REPORTS {
        int id PK
        int reporter_id FK
        int reported_id FK
        text reason
        timestamp reported_at
    }

    CHATS {
        int id PK
        int user1_id FK
        int user2_id FK
    }

    MESSAGES {
        int id PK
        int chat_id FK
        int sender_id FK
        text content
        timestamp sent_at
    }

    USER_IMAGES {
        int id PK
        int user_id FK
        text image_url
        boolean is_profile
        int position
    }

    USER_LOCATIONS {
        int user_id PK, FK
        float latitude
        float longitude
        text address
    }

    NOTIFICATIONS {
        int id PK
        int user_id FK
        string type
        json content
        boolean is_read
        timestamp created_at
    }

    %% Relationships

    USERS ||--|| AUTH : has
    USERS ||--o{ USER_TAGS : has
    TAGS ||--o{ USER_TAGS : has

    USERS ||--o{ LIKES : liker
    USERS ||--o{ LIKES : liked

    USERS ||--o{ PROFILE_VIEWS : viewer
    USERS ||--o{ PROFILE_VIEWS : viewed

    USERS ||--o{ BLOCKS : blocker
    USERS ||--o{ BLOCKS : blocked

    USERS ||--o{ REPORTS : reporter
    USERS ||--o{ REPORTS : reported

    USERS ||--o{ CHATS : user1
    USERS ||--o{ CHATS : user2

    CHATS ||--o{ MESSAGES : contains
    USERS ||--o{ MESSAGES : sends

    USERS ||--o{ USER_IMAGES : has
    USERS ||--|| USER_LOCATIONS : has

    USERS ||--o{ NOTIFICATIONS : receives
```