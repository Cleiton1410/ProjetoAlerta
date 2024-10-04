using System.Text.Json.Serialization;

namespace ProjetoAlertaServer;

public class Dado
{
    [JsonInclude]
    public int id;
    [JsonInclude]
    public required int idade;
    [JsonInclude]
    public required Curso curso;
}

public class Pessoa: Dado
{
  public required string login;
  public required string senha;
  public required string email;
  public required string datanasc;
}

public enum Curso {
  Nenhum = 0,
  Administracao = 1,
  EducaçãoFisica = 2,
  EngenhariaEletrica = 3,
  Medicina = 4,
  PublicidadeEPropaganda = 5,
  TecnologiaemGestaodeRecursosHumanos = 6,
  CienciasContabeis = 7,
  Enfermagem = 8,
  EngenhariaDeSoftware = 9,
  Odontologia = 10,
  TecnologiaEmAnaliseEDesenvolvimentoDeSistemas = 11,
  Direito = 12,
  EngenhariaCivil = 13,
  Fisioterapia = 14,
  Psicologia = 15,
  TecnologiaEmEstéticaECosmetica = 16,
}
