import psycopg2
import jwplatform

hostname = 'tourmonkeysdbinstance.cbjveiv1grwa.us-east-2.rds.amazonaws.com'
username = 'tourmonkeys'
password = 't0urTeam'
database = 'tourmonkeys_db'

jwplatform_client = jwplatform.Client('1ryuDBY4', 'WlssAsEKnQnvknA1BKNtXyyg')

update_sql = """ UPDATE content_video SET "streamViews" = %s WHERE "streamURL" = %s"""

updated_rows = 0


conn = psycopg2.connect( host=hostname, user=username, password=password, dbname=database )

cur = conn.cursor()

cur.execute( 'SELECT "streamURL" FROM content_video ' )

array = cur.fetchall(); 
for streamURL in array :

    response = jwplatform_client.videos.show(video_key=streamURL[0])


    cur2 = conn.cursor()
    # execute the UPDATE  statement

    cur2.execute(update_sql, (response["video"]["views"], streamURL[0] ))

    updated_rows = cur2.rowcount

    # Commit the changes to the database
    conn.commit()
    # Close communication with the PostgreSQL database
    cur2.close()

conn.close()

