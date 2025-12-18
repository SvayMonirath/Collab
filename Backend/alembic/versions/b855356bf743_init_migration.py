"""Init migration

Revision ID: b855356bf743
Revises: ad2ef65558f2
Create Date: 2025-12-18 15:06:09.688006

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b855356bf743'
down_revision: Union[str, Sequence[str], None] = 'ad2ef65558f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
