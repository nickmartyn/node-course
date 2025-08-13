import { Pool } from 'pg'

export class Orm<T extends object> {

constructor(private table: string, private pool: Pool) {
  this.table = table;
  this.pool = pool;

} 
  async findOne(id: number): Promise<T | null> {
    const query = {
      text: `SELECT * FROM ${this.table} WHERE id = $1`,
      values: [id],
    }

    const {rows} = await this.pool.query(query);
    return rows[0] || null;
  }

  async save(entity: Omit<T, 'id'>): Promise<T> {

    const columns = Object.keys(entity).map(col => `${col}`).join(', ');
    const valuesArr = Object.values(entity);
    const valuesAmount = valuesArr.map((_, index) => `$${index + 1}`).join(', ');
    
    const query = {
      text: `INSERT INTO ${this.table}(${columns}) VALUES(${valuesAmount}) RETURNING *`,
      values: valuesArr,
    }
    
    const { rows } = await this.pool.query(query);
    return rows[0];
  }

  async delete(id: number): Promise<void> {
    const query = {
      text: `DELETE FROM ${this.table} WHERE id = $1`,
      values: [id],
    }

    await this.pool.query(query);
  }

  async update(id: number, entity: Partial<Omit<T, 'id'>>): Promise<T | null> {
    const updates = Object.keys(entity).map((col, index) => `${col} = $${index + 1}`).join(', ');
    const valuesArr = Object.values(entity);
    
    const query = {
      text: `UPDATE ${this.table} SET ${updates} WHERE id = ${id} RETURNING *`,
      values: [...valuesArr],
    }

    console.log('Update Query:', query);

    const { rows } = await this.pool.query(query);
    return rows[0] || null;
  }

  async find(filters?: Partial<T>): Promise<T[]> {
    
    if (filters) {
      const conditions = Object.keys(filters).map((key, index) => `${key} = $${index + 1}`).join(' AND ');
      const values = Object.values(filters);
      const query = {
        text: `SELECT * FROM ${this.table} WHERE ${conditions}`,
        values,
      };
      const { rows } = await this.pool.query(query);
      return rows;
    } else {
      const query = `SELECT * FROM ${this.table}`;
      const { rows } = await this.pool.query(query);
      return rows;
    }
  }
}