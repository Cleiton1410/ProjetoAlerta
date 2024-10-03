namespace ProjetoAlertaServer;

using System.Data;
using System.Data.SQLite;

public class BancoDados
{
    private SQLiteConnection sqlite;

    public BancoDados()
    {
        sqlite = new SQLiteConnection("Data Source=./banco.db").OpenAndReturn();

        var cmd = sqlite.CreateCommand();
        cmd.CommandText = @"
            CREATE TABLE IF NOT EXISTS dado (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                curso TEXT,
                idade INTEGER
            )
        ";
        cmd.ExecuteNonQuery();
    }

    public async Task<int> InsertDado(string curso, int idade) {
        SQLiteCommand cmd;
        cmd = sqlite.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO dado (curso ,idade)
            VALUES ($curso, $idade)
            RETURNING id
        ";
        cmd.Parameters.AddWithValue("$idade", idade);
        cmd.Parameters.AddWithValue("$curso", curso);

        var res = await cmd.ExecuteReaderAsync();
        return res.GetInt32(0);
    }

    public Task<int> Execute(string query)
    {
        SQLiteCommand cmd;
        cmd = sqlite.CreateCommand();
        cmd.CommandText = query;
        return cmd.ExecuteNonQueryAsync();
    }

    public DataTable Query(string query)
    {
        SQLiteDataAdapter ad;
        DataTable dt = new DataTable();

        SQLiteCommand cmd;
        cmd = sqlite.CreateCommand();
        cmd.CommandText = query;
        ad = new SQLiteDataAdapter(cmd);
        ad.Fill(dt);

        return dt;
    }
}