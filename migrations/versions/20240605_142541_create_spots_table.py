"""create_spots_table

Revision ID: 1693a00a7a9e
Revises: ffdc0a98111c
Create Date: 2024-06-05 14:25:41.014873

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1693a00a7a9e'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('spots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('state', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('image_urls', sa.ARRAY(sa.String), nullable=False),
    sa.Column('num_bedrooms', sa.Integer(), nullable=False),  # Add new columns here
    sa.Column('num_bathrooms', sa.Float(), nullable=False),
    sa.Column('max_guests', sa.Integer(), nullable=False),
    sa.Column('amenities', sa.ARRAY(sa.String), nullable=True),
    sa.Column('house_rules', sa.Text(), nullable=True),
    sa.Column('availability', sa.JSON(), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('num_reviews', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('spots')
    # ### end Alembic commands ###
